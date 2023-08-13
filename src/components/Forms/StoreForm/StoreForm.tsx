import { useMutation } from "@tanstack/react-query";
import type { FormEvent } from "react";
import { Button, Input, Label, Menu, MenuAnchor, MenuItem, MenuList } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import { useModal } from "~/components/Modals/Modal.hooks";
import { useInputForm } from "~/hooks";
import { supabase } from "~/states/server";
import { FlexColumn, Text } from "~/styles/mixins";

export const StoreForm = () => {
  const { toast } = useDialog();
  const { unmount } = useModal();

  const { formData, register, isValid } = useInputForm({ name: "", address: "" });

  const { mutate } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("markets").insert(formData);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({ type: "success", message: "상가 등록 성공" });

      unmount("market");
    },
    onError: () => {
      toast({ type: "error", message: "상가 등록 실패" });
    }
  });

  const onSubmitHandler = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    mutate();
  };

  return (
    <FlexColumn as="form" gap={12} onSubmit={onSubmitHandler}>
      <Text size="heading3">상점 등록</Text>

      <Menu>
        <MenuAnchor>
          <Button>ddd</Button>
        </MenuAnchor>

        <MenuList>
          <MenuItem>ㅇㅇㅇㅇ</MenuItem>
          <MenuItem>ㅇㅇㅇㅇ</MenuItem>
          <MenuItem>ㅇㅇㅇㅇ</MenuItem>
        </MenuList>
      </Menu>

      <Menu>
        <MenuAnchor>
          <Label title="상가" required>
            <Input readOnly />
          </Label>
        </MenuAnchor>

        <MenuList>
          <MenuItem>ㅇㅇㅇㅇ</MenuItem>
          <MenuItem>ㅇㅇㅇㅇ</MenuItem>
          <MenuItem>ㅇㅇㅇㅇ</MenuItem>
        </MenuList>
      </Menu>

      <Label title="이름" desc="상호가 아닌 상가를 입력해주세요." required>
        <Input {...register("name")} placeholder="ex) 디오트" required />
      </Label>

      <Label title="주소" required>
        <Input {...register("address")} placeholder="ex) 서울 중구 다산로 293" required />
      </Label>

      <Button disabled={!isValid}>등록</Button>
    </FlexColumn>
  );
};
