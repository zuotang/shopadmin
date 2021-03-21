import { Box, Heading, Text } from "gestalt";

function IndexCard({ title, value, subTitle, subValue, color = "lightGray", textColor = "darkGray", valueColor = "darkGray" }) {
  return (
    <Box color={color} margin={1} padding={2} rounding={3} height={120}>
      <Box>
        <Text align="left" color={textColor}>
          {title}
        </Text>
      </Box>
      <Box>
        <Heading color={valueColor}>{value}</Heading>
      </Box>
      <Box marginTop={2}>
        <Text size="md" color={textColor} align="right">
          {subTitle} {subValue}
        </Text>
      </Box>
    </Box>
  );
}

export default IndexCard;
