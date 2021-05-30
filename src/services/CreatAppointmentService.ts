import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'

/**
 * [x] Recebimento das informações
 * [x] Tratativa de erros/excussões
 * [x] Acesso ao repositório
 */

interface Request {
  provider: string;
  date: Date;
}

/**
 * Dependency Inversion (SOLID)
 * DRY: Don't Repeat Yourself
 */

// O service deve ter uma funcionalidade só, então um único método
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository

  constructor (appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute ({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date) // começa em um determinado hora

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
