import { Box, Collapse, List, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';

import { useTheme } from '@emotion/react';
import Iconify from '@src/components/iconify/Iconify';
import { useAuthService } from '@src/store/hooks';
import _ from 'lodash';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { findIndexByPath } from '@src/utils/filter-helper';

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }: any) {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const getSelectedIndex = useCallback((pathname: string) => {
    return findIndexByPath(data, pathname);
  }, [data]);

  useEffect(() => {
    setSelectedIndex(getSelectedIndex(location.pathname));
  }, [getSelectedIndex, location.pathname]);

  return (
    <Box {...other}>
      <List disablePadding sx={{ py: 1.5 }}>
        {data.map((item: any, index: number) => {
          if (item.isSpacer) {
            return (<Box key={index.toString()} flex={1} />)
          }
          return (
            <NavItem key={`${item.title}-${index}`} item={item}
              isSelected={selectedIndex === index}
            />
          );
        })}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  isSelected: PropTypes.bool,
};

function NavItem({ item, isSelected }: any) {
  const theme: any = useTheme();
  const { onLogout } = useAuthService();
  const { title, path, icon, info, children } = item;
  const [subMenuOpen, setSubMenuUpen] = useState(false);

  const handleParentSelect = () => {
    if(title === "logout"){
      onLogout();
      return;
    }

    if(!_.isEmpty(children)){
      setSubMenuUpen(!subMenuOpen);
    }
  }

  const getPath = useCallback(() => {
    if (!children?.length) return {
      to: path,
      component: RouterLink,
    };
    return {};
  }, [children?.length, path]);

  return (
    <li>
      <StyledNavItem
        onClick={handleParentSelect}
        sx={{
          mx: "15px",
          '&.active, &.Mui-selected': {
            color: 'gold.main',
            bgcolor: 'blue.lighter',
            fontWeight: 'fontWeightBold',
          },
          '&:hover': {
            color: 'gold.main',
            bgcolor: 'blue.lighter',
          }
        }}
        selected={isSelected}
        {...getPath()}
      >
        {(isSelected) && <Box 
          sx={{
            display: "flex",
            height: "100%", width: "6px", 
            bgcolor: theme.palette.gold.main,
            borderRadius: "0px 10px 10px 0px", position: "absolute", left: "-15px",
            '&.active, &.Mui-selected': {
              display: "flex"
            }
          }} />}
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
        <ListItemText disableTypography primary={title} />
        {info && info}
        {children ? (
          <>
            <Iconify
              icon={subMenuOpen ? "eva:chevron-up-outline" : "eva:chevron-down-outline"}
              width={30}
            />
          </>
        ) : null}
      </StyledNavItem>
      <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children?.map((childRoute: any, index: number) => (
            <StyledNavItem
              key={index.toString()}
              component={RouterLink}
              to={childRoute.path}
              sx={{ pl: 9,
                '&.active': {
                  color: 'blue.main',
                  fontWeight: 'fontWeightBold',
                },
               }}
            >
              <ListItemText primary={childRoute.title} />
            </StyledNavItem>
          ))}
        </List>
      </Collapse>
    </li>
  );
}
