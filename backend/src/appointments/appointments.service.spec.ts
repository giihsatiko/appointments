import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('AppointmentsService', () => {
  let service: AppointmentsService;

  const mockPrismaService = {
    appointment: {
      findFirst: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an appointment', async () => {
      const dto = {
        name: 'Test',
        date: '2026-06-25T10:00:00.000Z',
        location: 'Room 1',
      };
      mockPrismaService.appointment.findFirst.mockResolvedValue(null);
      mockPrismaService.appointment.create.mockResolvedValue({
        id: '1',
        ...dto,
      });

      const result = await service.create(dto);
      expect(result).toEqual({ id: '1', ...dto });
      expect(mockPrismaService.appointment.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if appointment exists', async () => {
      const dto = {
        name: 'Test',
        date: '2026-06-25T10:00:00.000Z',
        location: 'Room 1',
      };
      mockPrismaService.appointment.findFirst.mockResolvedValue({
        id: '2',
        ...dto,
      });

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should return an appointment', async () => {
      const appointment = { id: '1', name: 'Test' };
      mockPrismaService.appointment.findUnique.mockResolvedValue(appointment);

      const result = await service.findOne('1');
      expect(result).toEqual(appointment);
    });

    it('should throw NotFoundException if not found', async () => {
      mockPrismaService.appointment.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });
});
