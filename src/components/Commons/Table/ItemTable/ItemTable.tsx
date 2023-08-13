import { useTranslation } from "next-i18next";
import { useGetItemsQuery } from "~/states/server";
import { FlexColumn, Grid, Text } from "~/styles/mixins";
import { Row } from "../Row";
import { ItemRow } from "./ItemRow";

export const ItemTable = () => {
  const { data: items } = useGetItemsQuery();
  const { t } = useTranslation("common");

  return (
    <FlexColumn>
      <Row title>
        <Grid column={5} align="center" justify="center" style={{ height: "40px" }}>
          <Text>{t("image")}</Text>
          <Text>{t("itemName")}</Text>
          <Text>{t("variationName")}</Text>
          <Text>{t("variationPrice")}</Text>
          <Text>{t("variationQuantity")}</Text>
        </Grid>
      </Row>

      {items.map((item) =>
        item.variations.map((variation) => (
          <ItemRow
            key={`${item.id}_${variation.id}`}
            name={item.name}
            imageUrl={item.images[0]?.imageUrl}
            variation={variation}
          />
        ))
      )}
    </FlexColumn>
  );
};
