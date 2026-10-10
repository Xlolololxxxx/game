import styled from "@emotion/styled";

const styles = {
  t_status: {
    display: "flex",
    flexDirection: "row",
    fontSize: 16,
    fontWeight: "500", 
    color: "#4C4C4C",
    gap: "0.5rem"
  },
  btn_deactivation: { paddingLeft: 2, paddingRight: 2, height: 39, borderRadius: 1.2, color: "white", bgcolor: "#484848"},
}

export const Icon = styled("img")({
  pointerEvents: "none",
  width: "89px",
  height: "89px",
  alignSelf: "center",
});

export default styles;