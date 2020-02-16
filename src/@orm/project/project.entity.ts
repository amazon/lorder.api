import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Moment } from 'moment';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TaskType } from '../../@orm/task-type/task-type.entity';

import { momentDateTransformer } from '../@columns/moment.date.transformer';
import { ProjectPub } from '../project-pub/project-pub.entity';
import { ProjectRole } from '../project-role/project-role.entity';
import { ProjectTaskType } from '../project-task-type/project-task-type.entity';
import { Task } from '../task/task.entity';
import { ACCESS_LEVEL } from '../user-project/user-project.consts';
import { UserProject } from '../user-project/user-project.entity';
import { User } from '../user/user.entity';

@Entity()
export class Project {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column('int', { nullable: true })
  monthlyBudget: number;

  @ApiProperty({ example: '2018-05-26T09:05:39.378Z' })
  @CreateDateColumn(momentDateTransformer)
  createdAt: Moment;

  @ApiProperty({ example: '2018-05-26T09:05:39.378Z' })
  @UpdateDateColumn(momentDateTransformer)
  updatedAt: Moment;

  @ApiProperty({ type: User })
  @ManyToOne(() => User)
  creator: User;

  @ApiProperty({ type: User })
  @ManyToOne(() => User)
  updator: User;

  @ApiProperty()
  @Column({ nullable: false })
  ownerId: number;

  @ApiProperty({ type: User })
  @ManyToOne(() => User, m => m.ownProjects, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  owner: User;

  @ApiProperty({ type: Task, isArray: true })
  @OneToMany(() => Task, m => m.project)
  tasks: Task[];

  @ApiPropertyOptional({ type: ProjectTaskType })
  @OneToOne(() => ProjectTaskType, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  @JoinColumn()
  defaultTaskType: ProjectTaskType;

  @OneToMany(() => ProjectTaskType, m => m.project)
  projectTaskTypes: ProjectTaskType[];

  @OneToOne(() => ProjectPub, m => m.project)
  pub: ProjectPub;

  @ApiPropertyOptional({ type: TaskType, isArray: true })
  get taskTypes() {
    return this.projectTaskTypes &&
      this.projectTaskTypes.length &&
      this.projectTaskTypes[0] &&
      this.projectTaskTypes[0].taskType
      ? this.projectTaskTypes.map(ptt => ptt.taskType)
      : [];
  }

  @ApiPropertyOptional({ type: UserProject, isArray: true })
  @OneToMany(() => UserProject, m => m.project)
  members: UserProject[];

  @ApiPropertyOptional({ type: () => ProjectRole, isArray: true })
  @OneToMany(() => ProjectRole, m => m.project)
  roles: ProjectRole[];

  @ApiPropertyOptional({
    description: 'Access Level for current user in current project',
    type: UserProject,
  })
  accessLevel?: Partial<UserProject>;

  @ApiPropertyOptional({ description: 'Время в секундах, потраченное на проект' })
  timeSum?: number;

  @ApiPropertyOptional({ description: 'Сумма всех оцененных задач в проекте' })
  valueSum?: number;

  isAccess(accessLevel: ACCESS_LEVEL) {
    return this.accessLevel && this.accessLevel.accessLevel >= accessLevel;
  }
}
