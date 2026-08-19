import { StudentsRepository } from "../../src/domain/forum/application/repositories/students-repository.js"
import { Student } from "../../src/domain/forum/enterprise/entities/student.js"

export class InMemoryStudentsRepository implements StudentsRepository {
  items: Student[] = []

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email.toString() === email)

    if (!student) {
      return null
    }

    return student
  }

  async create(student: Student) {
    this.items.push(student)
  }
}
