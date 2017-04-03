import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  StyleSheet,
  ScrollView
} from 'react-native';
import { List, ListItem, Button } from 'react-native-elements';
import GiftedSpinner from 'react-native-gifted-spinner';
import Spinner from 'react-native-loading-spinner-overlay';

class Feed extends React.Component {
    constructor(props, context) {
    super(props, context);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: this.rowHasChanged.bind(this),
      }),
    };
   // this.state.dataSource = this.getUpdatedDataStore(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        dataSource: this.getUpdatedDataSource(nextProps),
    });
  }
  getUpdatedDataSource(props) {
    const { data } = props;
    let rows = data.users;
    let ids = rows.map((obj, index) => index);

    return this.state.dataSource.cloneWithRows(rows, ids);
  }
  rowHasChanged(r1, r2) {
    return JSON.stringify(r1) !== JSON.stringify(r2);
  }
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

            { data ? data.loading ?
                <GiftedSpinner />
                /*<Spinner visible={data.loading}/>*/
                :
                data.users ?
                    /*data.users.map(user => (
                        <ListItem
                            key={user.uid}
                            roundAvatar
                            avatar={{ uri: user.photo_url ? user.photo_url : null }}
                            title={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                            subtitle={user.mail}
                            onPress={() => this.onLearnMore(user)}
                        />
                    ))*/
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(user) => (
                            <ListItem
                                key={user.uid}
                               // roundAvatar
                               // avatar={{ uri: user.photo_url ? user.photo_url : null }}
                                title={`${user.firstname.toUpperCase()} ${user.lastname.toUpperCase()}`}
                                subtitle={user.mail}
                                onPress={() => this.onLearnMore(user)}
                            />
                        )}
                    />
                    : <Text>{'None'}</Text>
                : <Text>{'None data'}</Text>

            }
        </List>
      </ScrollView>
    );
  }
}
Feed.propTypes = {
    data: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    scrollView: {
    },
});
export default Feed;
