// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2022-2023 Dyne.org foundation <foundation@dyne.org>.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { Button, Icon } from "@bbtgnn/polaris-interfacer";
import { StarFilledMinor, StarOutlineMinor } from "@shopify/polaris-icons";
import useSocial from "hooks/useSocial";
import useWallet from "hooks/useWallet";
import { IdeaPoints } from "lib/PointsDistribution";
import { useTranslation } from "next-i18next";

//

const AddStar = ({ id, owner }: { id: string; owner: string }) => {
  const { likeER, isLiked } = useSocial(id);
  const hasAlreadyStarred = isLiked(id);
  const { t } = useTranslation("common");
  const { addIdeaPoints } = useWallet();
  const handleClick = async () => {
    await likeER();
    //economic system: points assignments
    addIdeaPoints(owner, IdeaPoints.OnStar);
  };

  return (
    <Button
      id="likeButton"
      onClick={handleClick}
      fullWidth
      disabled={hasAlreadyStarred}
      size="large"
      icon={<Icon source={hasAlreadyStarred ? StarFilledMinor : StarOutlineMinor} />}
    >
      {`${hasAlreadyStarred ? t("You already star it!") : t("Star")}`}
    </Button>
  );
};

export default AddStar;
