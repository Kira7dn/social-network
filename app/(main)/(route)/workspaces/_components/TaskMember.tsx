import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMembers } from "@/hooks/use-members";

export interface TaskMemberProps {
  name: string;
  role: string;
  workOn: string;
  imgSrc: string;
}
interface TaskMembersProps {
  members?: string[];
}

const MemberDetail: React.FC<TaskMemberProps> = ({
  name,
  role,
  workOn,
  imgSrc,
}) => (
  <section className="flex gap-5 justify-start w-full h-9">
    <div className="flex gap-3.5 justify-start">
      <div className="w-9 shadow-sm aspect-square relative">
        <Image
          src={imgSrc}
          alt={name}
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
      <div className="flex flex-col w-32 h-8">
        <p className="text-small-regular text-card-foreground">
          {name}
        </p>
        <p className="text-tiny-medium text-secondary">
          {role}
        </p>
      </div>
    </div>
    <div className="flex flex-col justify-between">
      <div className="text-tiny-medium text-card-foreground">
        Work On
      </div>
      <div className="text-tiny-medium text-secondary">
        {workOn}
      </div>
    </div>
  </section>
);

const TaskMember = ({ members }: TaskMembersProps) => {
  const membersData = [
    {
      name: "Kim Mengkoi",
      role: "UI Designer",
      workOn: "Travel mobile App",
      imgSrc: "/assets/sampleUser.png",
    },
    {
      name: "Park Jae-Eon",
      role: "UX Research",
      workOn: "Task Manager",
      imgSrc: "/assets/sampleUser.png",
    },
    {
      name: "Yu Na-Bi",
      role: "Product Manager",
      workOn: "Landing Page",
      imgSrc: "/assets/sampleUser.png",
    },
    {
      name: "Floyd Miles",
      role: "UI Designer",
      workOn: "Landing Page",
      imgSrc: "/assets/sampleUser.png",
    },
  ];
  const memberModal = useMembers();

  return (
    <section className="w-4/12 h-full flex flex-col items-center p-2 gap-2 bg-card rounded-md border border-solid border-card-foreground text-body-normal text-secondary">
      <header className="w-full h-7 flex justify-between">
        <h2 className="text-large-semibold text-card-foreground items-center">
          Member
        </h2>
        <Button
          className="text-small-regular rounded-xl h-full px-2"
          variant="outline"
          onClick={() => memberModal.onOpen(members)}
        >
          See More
        </Button>
      </header>
      <div className="w-full h-44 flex flex-col gap-2 overflow-hidden">
        {membersData.map((member, index) => (
          <MemberDetail
            key={index}
            name={member.name}
            role={member.role}
            workOn={member.workOn}
            imgSrc={member.imgSrc}
          />
        ))}
      </div>
    </section>
  );
};

export default TaskMember;
