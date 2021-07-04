export type UseStylesOfButtonOfSignInProviderType = {
  color: string;
};

export type ButtonOfSignInProviderPropsType = {
  onClick: (e: any) => void;
  name: string;
} & UseStylesOfButtonOfSignInProviderType;
