import SvgColor from '@src/components/svg-color';

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

export const FullAccess = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_dashboard'),
  },
  {
    title: 'games',
    path: '/dashboard/games',
    icon: icon('ic_games'),
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  {
    title: 'most played',
    path: '/dashboard/mostplayed',
    icon: icon('ic_star'),
  },
  {
    title: 'purchases',
    path: '/dashboard/purchase',
    icon: icon('ic_cart'),
  },
  {
    title: 'platform tools',
    path: '/dashboard/platform-tools',
    icon: icon('ic_platform'),
    children: [
      {
        title: 'overview',
        path: '/dashboard/platform-tools/overview',
      },
      {
        title: 'in mail portal',
        path: '/dashboard/platform-tools/in-mail-portal',
      },
      {
        title: 'missions',
        path: '/dashboard/platform-tools/missions',
      },
    ]
  },
  {
    title: 'marketing tools',
    path: '/dashboard/marketing-tools',
    icon: icon('ic_marketing'),
    children: [
      {
        title: 'code generator',
        path: '/dashboard/marketing-tools/code-generator',
      },
    ]
  },
  {
    title: 'redeem transaction',
    path: '/dashboard/control-panel/redeem',
    icon: icon('ic_redeem'),
  },
  {
    title: 'revenue program',
    path: '/dashboard/programs',
    icon: icon('ic_revenue')
  },
  {
    title: '',
    path: '',
    isSpacer: true,
  },
  {
    title: 'control panel',
    path: '/dashboard/control-panel',
    icon: icon('ic_control'),
    children: [
      {
        title: 'redeem transactions',
        path: '/dashboard/control-panel/redeem',
        icon: icon('ic_star'),
      },
      {
        title: 'manage team',
        path: '/dashboard/control-panel/team',
      },
      {
        title: 'partners',
        path: '/dashboard/control-panel/partners',
      },
      {
        title: 'licenses',
        path: '/dashboard/control-panel/licenses',
      },
    ]
  },
  {
    title: 'settings',
    path: '/dashboard/settings',
    icon: icon('ic_settings'),
    children: [
      {
        title: 'update user details',
        path: '/dashboard/settings/user-details',
      },
      {
        title: 'company profile',
        path: '/dashboard/settings/company-profile',
      },
      {
        title: 'terms & conditions',
        path: '/dashboard/settings/terms-and-conditions',
      },
      {
        title: 'portal guide',
        path: '/dashboard/settings/portal-guide',
      },
      {
        title: 'contact support',
        path: '/dashboard/settings/contact-support',
      },
    ]
  },{
    title: 'logout',
    path: '/dashboard/logout',
    icon: icon('ic_logout')
  },
];

export const AdditionalAccess = FullAccess.concat([
  {
    title: 'game activity',
    path: '/dashboard/games/history',
    icon: icon('ic_games'),
  },
  {
    title: 'game history',
    path: '/dashboard/users/game-history',
    icon: icon('ic_games'),
  },

  // PLATFORM TOOLS
  {
    title: 'missions data',
    path: '/dashboard/platform-tools/mission-data',
    icon: icon('ic_platform'),
  },
  {
    title: 'most popular deal',
    path: '/dashboard/platform-tools/most-popular-deal',
    icon: icon('ic_platform'),
  },
  {
    title: 'gold shop data',
    path: '/dashboard/platform-tools/gold-shop-data',
    icon: icon('ic_platform'),
  },
  {
    title: 'shop data',
    path: '/dashboard/platform-tools/shop-data',
    icon: icon('ic_platform'),
  },
])

const LionsPartner = [
  {
    title: 'purchase',
    path: '/dashboard/purchase',
    icon: icon('ic_cart'),
  },
  {
    title: 'most played',
    path: '/dashboard/mostplayed',
    icon: icon('ic_star'),
  },
];

const getDrawerList = (userTypeID: number) => {
  if (userTypeID !== 4) {
    return FullAccess;
  } else {
    return LionsPartner;
  }
}

export default getDrawerList;
