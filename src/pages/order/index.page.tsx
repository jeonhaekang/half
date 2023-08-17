import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import { Button, Row } from "~/components/Commons";
import { useDialog } from "~/components/Dialogs";
import { SupabaseKey, useDeleteOrderSheetMutate, useGetOrderSheetsQuery } from "~/states/server";
import { Flex, FlexColumn, Text } from "~/styles/mixins";

const Order = () => {
  const queryClient = useQueryClient();
  const { toast, confirm } = useDialog();
  const { data: orderSheets } = useGetOrderSheetsQuery();

  const { mutate: deleteOrderSheetMutate } = useDeleteOrderSheetMutate({
    onSuccess: () => {
      queryClient.invalidateQueries(SupabaseKey.getOrderSheets());

      toast({ type: "success", message: "시트를 제거하였습니다." });
    },
    onError: () => {
      toast({ type: "success", message: "시트를 제거에 실패하였습니다." });
    }
  });

  return (
    <FlexColumn>
      <Row isTitle style={{ padding: "8px" }}>
        <Text>주문 일자</Text>
      </Row>

      {orderSheets.map((sheet) => (
        <Row key={sheet.id} style={{ padding: "8px" }}>
          <Flex justify="between">
            <Link href={`order/${sheet.id}`}>
              <Text>{dayjs(sheet.createdAt).format("YYYY년 MM월 DD일 hh시 mm분")}</Text>
            </Link>

            <Button
              variant="secondary"
              size="small"
              onClick={async () => {
                if (await confirm({ message: "시트를 삭제하시겠습니까?" }))
                  deleteOrderSheetMutate(sheet.id);
              }}
            >
              삭제
            </Button>
          </Flex>
        </Row>
      ))}
    </FlexColumn>
  );
};

export default Order;
