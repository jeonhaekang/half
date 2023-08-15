import dayjs from "dayjs";
import Link from "next/link";
import { Row } from "~/components/Commons";
import { useGetOrderSheetsQuery } from "~/states/server";
import { FlexColumn, Text } from "~/styles/mixins";

const Order = () => {
  const { data: orderSheets } = useGetOrderSheetsQuery();

  return (
    <FlexColumn>
      <Row isTitle style={{ padding: "8px" }}>
        <Text>주문 일자</Text>
      </Row>

      {orderSheets.map((sheet) => (
        <Row key={sheet.id} style={{ padding: "8px" }}>
          <Link href={`order/${sheet.id}`}>
            <Text>{dayjs(sheet.createdAt).format("YYYY년 MM월 DD일 hh시 mm분")}</Text>
          </Link>
        </Row>
      ))}
    </FlexColumn>
  );
};

export default Order;
