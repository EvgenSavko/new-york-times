import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Drawer } from '../../modules'
import { primary } from '../../utils/constants/theme'
import { Body, Button, Header as HeaderNativeBase, Icon, Left, Right, Title, Text } from 'native-base'

const Header = ({
  history,
  handleOpenDrawer,
}) => {
  return (
    <>
      <HeaderNativeBase style={styles.header}>
        <Left>
          <Button transparent onPress={() => history.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>New York Times</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="menu" onPress={handleOpenDrawer}/>
          </Button>
        </Right>
      </HeaderNativeBase>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: primary,
    // zIndex: 1000,
  },
})

export default Header
