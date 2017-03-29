import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';

class Feed extends Component {
  onLearnMore = (user) => {
    // this.props.navigation.navigate('Details', { ...user });
      this.props.navigation.navigate('Details', { uid: user.uid });
  };
  onButtonPress () {
    const { data } = this.props;
    //apolloClient.resetStore();
    data.refetch();
  }
  render() {

    const { data } = this.props;
    return (
      <ScrollView style={styles.scrollView} contentContainerStyle={{paddingBottom: 15}}>
        <Button
            onPress={this.onButtonPress.bind(this)}
            raised
            icon={{name: 'cached'}}
            title='Update data' />
        <List>

            { data ? data.loading ? <Text >{'Loading'}</Text>
                :
                data.users ?
                    data.users.map(user => (
                        <ListItem
                            key={user.uid}
                            roundAvatar
                            avatar={{ uri: user.photo_url ? user.photo_url : null }}
                            title={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                            subtitle={user.mail}
                            onPress={() => this.onLearnMore(user)}
                        />
                    )) : <Text>{'None'}</Text>
                : <Text>{'None data'}</Text>

            }
        </List>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
    scrollView: {
    },
});
export default Feed;
