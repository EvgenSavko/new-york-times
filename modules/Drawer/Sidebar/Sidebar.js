import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { withRouter, Route } from 'react-router-native'
import { white, primary, text, secondary } from '../../../utils/constants/theme'
import { Container, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base'
import app from 'firebase/app'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const routesList = [
  {
    id: 1,
    title: 'Main',
    route: '/main/home',
    renderIcon: (color) => <MaterialIcons size={20} name="home" color={color}/>
  },
  {
    id: 2,
    title: 'Read',
    route: '/main/read',
    renderIcon: (color) => <MaterialIcons size={20} name="forward" color={color}/>
  },
  {
    id: 3,
    title: 'API articles',
    route: '/main/api_articles',
    renderIcon: (color) => <MaterialIcons size={20} name="forward" color={color}/>
  },
  {
    id: 4,
    title: 'Review',
    route: '/main/review',
    renderIcon: (color) => <MaterialIcons size={20} name="forward" color={color}/>
  },
  {
    id: 5,
    title: 'Profile',
    route: '/main/profile',
    renderIcon: (color) => <MaterialIcons size={20} name="pencil" color={color}/>
  },
]

const Sidebar = ({ history, handleCloseDrawer }) => {
  const [activeRoute, setActiveRoute] = useState(null)

  useEffect(() => {
    const currentRoute = routesList.find(item => item.route === history.location.pathname)
    if (currentRoute && currentRoute.id !== activeRoute) {
      setActiveRoute(currentRoute.id)
    }
  }, [history.location.pathname])

  const logOutHandler = () => {
    app
      .auth()
      .signOut()
      .then(
        () => {
          console.log('Signed Out')
          history.push('/login')
        },
        error => {
          console.error('Sign Out Error', error)
        }
      )
  }

  console.log('activeRoute ', activeRoute)
  return (
    <Container style={styles.container}>
      <Content>
        <List>
          <ListItem
            onPress={logOutHandler}
          >
            <Left>
              <Text style={styles.text}>Log Out</Text>
            </Left>
            <Right>
              <MaterialIcons name='logout' size={20}/>
            </Right>
          </ListItem>
          {routesList.map(item => (
            <ListItem
              key={item.id}
              selected={item.id === activeRoute}
              onPress={() => {
                history.push(item.route)
                handleCloseDrawer()
              }}
              style={item.id === activeRoute && styles.activeItem}
            >
              <Left>
                <Text style={item.id === activeRoute ? styles.activeItemText : styles.text}>{item.title}</Text>
              </Left>
              <Right>
                {item.renderIcon(item.id === activeRoute ? styles.activeItemText : styles.text)}
                {/*<Icon name="arrow-forward" style={item.id === activeRoute ? styles.activeItemText : styles.text} />*/}
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
  },
  activeItem: {
    borderBottomColor: primary,
    borderBottomWidth: 1,
  },
  activeItemText: {
    color: primary,
  },
  text: {
    color: text,
  },
})

export default withRouter(Sidebar)
