import { Text } from "@bbtgnn/polaris-interfacer";
import classNames from "classnames";
import { useAuth } from "hooks/useAuth";
import { Agent, EconomicResource } from "lib/types";
import Link from "next/link";
import { useState } from "react";
import AddStar from "./AddStar";
import BrTags from "./brickroom/BrTags";
import BrUserAvatar from "./brickroom/BrUserAvatar";
import ProjectImage from "./ProjectImage";
import ProjectTypeChip from "./ProjectTypeChip";
import { ProjectType } from "./types";

export interface ProjectCardProps {
  project: Partial<EconomicResource>;
}

export default function ProjectCard(props: ProjectCardProps) {
  const { project } = props;
  const { user } = useAuth();

  const [hover, setHover] = useState(false);
  const setHoverTrue = () => setHover(true);
  const setHoverFalse = () => setHover(false);

  const classes = classNames("rounded-lg bg-white shadow", {
    "ring-2 ring-primary": hover,
  });

  return (
    <div className={classes}>
      <div className="space-y-3 p-3">
        <div className="flex justify-between items-center">
          <UserDisplay user={project.primaryAccountable!} />
          {user && <AddStar id={project.id!} owner={project.primaryAccountable!.id} tiny />}
        </div>

        <div onMouseOver={setHoverTrue} onMouseLeave={setHoverFalse}>
          <Link href={`/project/${project.id}`}>
            <a className="space-y-3">
              <ProjectImage
                projectType={project.conformsTo!.name as ProjectType}
                image={project.images?.[0]}
                className="rounded-lg object-cover h-48 w-full"
              />
              <Text variant="headingLg" as="h4">
                {project.name}
              </Text>
              <ProjectTypeChip project={project} />
            </a>
          </Link>
        </div>
      </div>

      {project.classifiedAs?.length && (
        <div className="p-3 border-t-1 border-t-gray-200">
          <BrTags tags={project.classifiedAs || []} />
        </div>
      )}
    </div>
  );
}

/* Partials */

function UserDisplay(props: { user: Partial<Agent> }) {
  const { user } = props;
  return (
    <Link href={`/profile/${user.id}`}>
      <a>
        <div className="flex items-center space-x-2 hover:underline">
          <BrUserAvatar name={user.name} size="36px" />
          <Text as="p" variant="bodyMd" fontWeight="medium">
            <span className="text-primary">{user.name}</span>
          </Text>
        </div>
      </a>
    </Link>
  );
}
