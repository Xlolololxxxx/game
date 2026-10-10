import styled from "@emotion/styled";

const styles = {
  signup_stack: {
    pl: "10%",
    pr: "10%",
    pb: "40px",
    bgcolor: "white",
    margin: '0 auto',
    boxShadow: 1,
    borderRadius: "16px",
    pt: {
      xs: '40px',
      sm: '40px',
      md: '50px',
      lg: '60px',
      xl: '60px',
    },
    width: {
      xs: '98%',
      sm: '98%',
      md: '60%',
      lg: '50%',
      xl: '55%',
    },
  },
  t_signup: { 
    fontSize: {
      xs: 20,
      sm: 20,
      md: 20,
      lg: 24,
      xl: 24,
    }, 
    fontFamily: "Inter",
    color: 'black' 
  },
  t_description: {  
    fontSize: {
      xs: 13,
      sm: 13,
      md: 13,
      lg: 14,
      xl: 14,
    }, 
    fontFamily: "Inter",
    fontWeight: "700", 
    color: '#64748B' 
  },


  // EMAIL SENT
  fss_stack: {
    pl: "10%",
    pr: "10%",
    bgcolor: "white",
    margin: '0 auto',
    boxShadow: 1,
    borderRadius: "16px",
    pt: {
      xs: '40px',
      sm: '40px',
      md: '50px',
      lg: '60px',
      xl: '60px',
    },
    pb: {
      xs: '40px',
      sm: '40px',
      md: '50px',
      lg: '60px',
      xl: '60px',
    },
    width: {
      xs: '98%',
      sm: '98%',
      md: '60%',
      lg: '50%',
      xl: '50%',
    },
  },
  t_email_sent: { 
    fontSize: {
      xs: 20,
      sm: 20,
      md: 20,
      lg: 24,
      xl: 24,
    },
    fontFamily: "Inter",
    textAlign: "center",
    color: 'black' 
  },
  fss_t_description: {  
    fontSize: {
      xs: 13,
      sm: 13,
      md: 13,
      lg: 14,
      xl: 14,
    }, 
    fontFamily: "Inter",
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