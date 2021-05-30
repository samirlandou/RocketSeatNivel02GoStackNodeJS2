import Appointment from '../models/Appointment'
import { isEqual } from 'date-fns'

// DTO: Data Transfer Object
interface CreateAppointmentDTO{
  provider: string;
   date: Date;
}

/**
 * SOLID
 * SRP (Single Responsibility Principle);
 * OCP (Open–closed Principle);
 * LSP (Liskov substitution Principle);
 * ISP (Interface segregation Principle);
 * DIP (Dependency Inversion Principle).
 *
 * Fizemos aqui:
 * Single Responsibility Principle
 * Dependency Inversion Principle
 */
class AppointmentsRepositories {
  private appointments: Appointment[]

  constructor () {
    this.appointments = [] // variável não acessível fora da classe.
  }

  public all () : Appointment[] {
    return this.appointments
  }

  public findByDate (date: Date) : Appointment | null {
    const findAppointmentInSameDate = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    )
    return findAppointmentInSameDate || null
  }

  // usar aqui un DTO para (provider: string, date: Date)
  public create ({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepositories
