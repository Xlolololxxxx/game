import { Grid, Typography } from '@mui/material';
import React from 'react';
// ----------------------------------------------------------------------

const RULES = [
  {
    type: "MINIMUM",
    rule: "8 characters minimum",
  },{
    type: "UPPERCASE",
    rule: "Contains uppercase character",
  },{
    type: "NUMBER-SYMBOLS",
    rule: "Contains a number and symbol",
  },{
    type: "LOWERCASE",
    rule: "Contains lowercase character",
  }
];

type Props = {
  password: string;
};

export default function PasswordRules({ password }: Props) {
  const enableRule = React.useMemo(() => {
    const rule = [];
    if(password.length >= 8){
      rule.push("MINIMUM");
    }
    if(password.match(/^(?:(?=.*\d)(?=.*[#$@!%&*?]).*)$/)){
      rule.push("NUMBER-SYMBOLS");
    }
    if(password.match(/^(?:(?=.*[a-z]).*)$/)){
      rule.push("LOWERCASE");
    }
    if(password.match(/^(?:(?=.*[A-Z]).*)$/)){
      rule.push("UPPERCASE");
    }

    return rule;
  },[password]);

  return (
    <Grid container>
      {RULES.map((item: any) => {
        const isEnable = enableRule.includes(item.type);

        return (
          <Grid key={item.type} item md={6} xs={12}> 
            <Typography variant="body1" fontFamily={"Inter"} fontSize={12} color={isEnable ? "black" : "#C3C3C3"}>
              • {item.rule}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}
