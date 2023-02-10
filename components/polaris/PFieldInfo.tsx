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

import PError, { PErrorProps } from "./PError";
import PHelp, { PHelpProps } from "./PHelp";
import PLabel, { PLabelProps } from "./PLabel";
import { ChildrenProp as CP } from "./types";

export interface PFieldInfoProps extends PLabelProps, PErrorProps, PHelpProps, CP {}

export default function PFieldInfo(props: PFieldInfoProps) {
  return (
    <div>
      {props.label && <PLabel {...props} />}
      {props.children}
      {props.error && <PError {...props} />}
      {props.helpText && <PHelp {...props} />}
    </div>
  );
}
