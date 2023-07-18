import { MinimalBrainForUser } from "@/lib/context/BrainProvider/types";

import { DeleteBrain, ShareBrain } from "./components";

type BrainActionsProps = {
  brain: MinimalBrainForUser;
};

export const BrainActions = ({ brain }: BrainActionsProps): JSX.Element => {
  return (
    <div className="absolute right-0 flex flex-row">
      {brain.rights === "Owner" && <ShareBrain brainId={brain.id} />}
      <DeleteBrain brainId={brain.id} />
    </div>
  );
};
