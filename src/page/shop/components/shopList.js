import React, { useState, useEffect, useRef } from "react";
import { Table, Text, Image, Mask, Box } from "gestalt";

function ShopList({ match, history, location }) {
  //let page = +match.params.page || 0;
  //const urlParams = new URLSearchParams(location.search);

  return (
    <>
      <Table>
        <Table.Header sticky>
          <Table.Row>
            <Table.HeaderCell>
              <Text weight="bold">Image</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">Name</Text>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Text weight="bold">House</Text>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Box width={50}>
                <Mask rounding="circle">
                  <Image alt="Luna" src="https://i.ibb.co/QY9qR7h/luna.png" naturalHeight={50} naturalWidth={50} />
                </Mask>
              </Box>
            </Table.Cell>
            <Table.Cell>
              <Text>Luna Lovegood</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Ravenclaw</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Box width={50}>
                <Mask rounding="circle">
                  <Image alt="Draco" src="https://i.ibb.co/Hzcfxjt/draco.png" naturalHeight={50} naturalWidth={50} />
                </Mask>
              </Box>
            </Table.Cell>
            <Table.Cell>
              <Text>Draco Malfoy</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Slytherin</Text>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Box width={50}>
                <Mask rounding="circle">
                  <Image alt="Neville" src="https://i.ibb.co/JvY9DKK/neville.png" naturalHeight={50} naturalWidth={50} />
                </Mask>
              </Box>
            </Table.Cell>
            <Table.Cell>
              <Text>Neville Longbottom</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>Gryffindor</Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}

export default ShopList;
