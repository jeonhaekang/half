import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Icon } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import type { PROVIDER_LIST } from "~/constants";
import { useSignInWithOAuthMutate } from "~/states/server";
import { flex, size } from "~/styles/mixins";
import type { OneOf } from "~/types";
import { BG_COLOR_MAP, ICON_COLOR_MAP } from "./SocialLogin.constants";

interface SocialLoginProps {
  provider: OneOf<typeof PROVIDER_LIST>;
}

export const SocialLogin = ({ provider }: SocialLoginProps) => {
  const { toast } = useDialog();

  const { mutate: signInWithOAuthMutate } = useSignInWithOAuthMutate({
    onError: () => toast({ type: "error", message: "로그인에 실패하였습니다." })
  });

  const handleOAuthLogin = () => signInWithOAuthMutate(provider);

  return (
    <Button onClick={handleOAuthLogin} provider={provider}>
      <Icon name={provider} width={24} height={24} />
    </Button>
  );
};

export const Button = styled.button<Pick<SocialLoginProps, "provider">>`
  ${flex.center()}

  ${size.circle(54)}

  ${({ provider }) => css`
    background-color: ${BG_COLOR_MAP[provider]};

    color: ${ICON_COLOR_MAP[provider]};
  `};
`;
