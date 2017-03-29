import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class UserDetail extends Component {
  renderUserInfo(user){
      return (
        <View>
            <Tile
                imageSrc={{ uri: user.photo_url}}
                featured
                title={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                caption={user.mail}
            />

            <List>
                <ListItem
                    title="Email"
                    rightTitle={user.mail}
                    hideChevron
                />
                {/*<ListItem*/}
                {/*title="Phone"*/}
                {/*rightTitle={phone}*/}
                {/*hideChevron*/}
                {/*/>*/}
            </List>

            <List>
                <ListItem
                    title="Username"
                    rightTitle={user.name}
                    hideChevron
                />
            </List>

            <List>
                <ListItem
                    title="Birthday"
                    rightTitle={user.birthday}
                    hideChevron
                />
                <ListItem
                    title="City"
                    rightTitle={user.city.name}
                    hideChevron
                />
            </List>
        </View>
      )
  }
  render() {
    const { data } = this.props;

    return (
      <ScrollView>
          { data ? data.loading ? <Text>{'Loading'}</Text>
              :
              data.user ? this.renderUserInfo(data.user) : <Text>{'None User'}</Text>
              : <Text>{'None data'}</Text>

          }
      </ScrollView>
    );
  }
}

export default UserDetail;
