import styled from "@emotion/styled";

const styles = {
  // FORGOT 
  forgot_stack: {
    pl: "10%",
    pr: "10%",
    bgcolor: "white",
    margin: '0 auto',
    boxShadow: 1,
    borderRadius: "16px",
    pt: {
      xs: '50px',
      sm: '50px',
      md: '70px',
      lg: '80px',
      xl: '110px',
    },
    pb: {
      xs: '50px',
      sm: '50px',
      md: '70px',
      lg: '80px',
      xl: '110px',
    },
    width: {
      xs: '98%',
      sm: '98%',
      md: '60%',
      lg: '50%',
      xl: '50%',
    },
  },
  t_reset_password: { 
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
  link: { textDecoration: 'none', color: 'white', alignSelf: "center", paddingTop: 10 },

  // FORGOT SENT SUCCESS
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


  // FORGOT SENT SUCCESS
  prs_stack: {
    pl: "10%",
    pr: "10%",
    bgcolor: "white",
    margin: '0 auto',
    boxShadow: 1,
    borderRadius: "16px",
    pt: {
      xs: '50px',
      sm: '50px',
      md: '60px',
      lg: '70px',
      xl: '70px',
    },
    pb: {
      xs: '50px',
      sm: '50px',
      md: '60px',
      lg: '70px',
      xl: '70px',
    },
    width: {
      xs: '98%',
      sm: '98%',
      md: '60%',
      lg: '50%',
      xl: '50%',
    },
  },
}

export const Icon = styled("img")({
  pointerEvents: "none",
  width: "89px",
  height: "89px",
  alignSelf: "center",
});

export default styles;