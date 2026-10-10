import { Helmet } from "react-helmet-async"
import ManageTeamBody from "./body"
import InviteFormDialog from "./invite-form"
import ManageTeamProvider from "./provider"
import UpdateTeamMember from "./update-form"

export default function ManageTeam() {
  return (
    <ManageTeamProvider>
      <>
        <Helmet>
          <title> Control Panel | Manage Team</title>
        </Helmet>
        <ManageTeamBody />
        <InviteFormDialog />
        <UpdateTeamMember />
      </>
    </ManageTeamProvider>
  )
}