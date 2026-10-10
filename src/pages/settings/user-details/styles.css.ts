import styled from "@emotion/styled";

const styles = {
  prs_stack: {
    pt: {
      xs: '20px',
      sm: '20px',
      md: '30px',
      lg: '30px',
      xl: '30px',
    },
    width: {
      xs: '98%',
      sm: '98%',
      md: '60%',
      lg: '38%',
      xl: '38%',
    },
  },
  t_email_sent: { 
    fontSize: {
      xs: 17,
      sm: 17,
      md: 17,
      lg: 20,
      xl: 20,
    },
    textAlign: "center",
    color: 'black' 
  },
  fss_t_description: {  
    fontSize: {
      xs: 10,
      sm: 10,
      md: 10,
      lg: 12,
      xl: 12,
    }, 
    textAlign: "center",
    fontWeight: "700", 
    color: '#64748B' 
  },
}

export const Icon = styled("img")({
  pointerEvents: "none",
  width: "89px",
  height: "89px",
  alignSelf: "center",
});

export default styles;