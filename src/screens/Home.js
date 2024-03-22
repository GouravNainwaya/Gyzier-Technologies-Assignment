import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Add from '../assets/Add.svg';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import CustomBtn from '../components/CustomBtn';
import Card from '../components/Card';
import RectangleBtn from '../components/RectangleBtn';
import {colors} from '../utils/theme';

const ListEmpty = () => {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: responsiveHeight(2),
      }}>
      <View
        style={{
          flex: 1,
          height: responsiveHeight(0.4),
          backgroundColor: colors.lightYellow,
          width: responsiveWidth(18),
        }}
      />
      <Text
        style={{
          fontSize: responsiveFontSize(3),
          color: '#ffffff',
          paddingVertical: responsiveHeight(1),
          textAlign: 'center',
        }}>
        No tasks
      </Text>
      <View
        style={{
          flex: 1,
          height: responsiveHeight(0.4),
          backgroundColor: colors.lightYellow,
          width: responsiveWidth(18),
        }}
      />
    </View>
  );
};

const Home = () => {
  const [expandedCards, setExpandedCards] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isdeleteModelVisible, setIsdeleteModelVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [delteItem, setDelteItem] = useState(null);
  const handleExpandToggle = useCallback(
    cardId => {
      if (expandedCards.includes(cardId)) {
        setExpandedCards(expandedCards.filter(id => id !== cardId));
      } else {
        setExpandedCards([...expandedCards, cardId]);
      }
    },
    [expandedCards],
  );

  const handleCreate = () => {
    if (title.trim() !== '' && subtitle.trim() !== '') {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9), // Generate unique ID
        title: title,
        subtitle: subtitle,
      };
      setData([...data, newItem]);
      setTitle('');
      setSubtitle('');
    } else {
      Alert.alert('Please Fill All Fields');
    }
  };
  const handleEdit = () => {
    if (editTitle.trim() !== '' && editSubtitle.trim() !== '') {
      const updatedData = data.map(item =>
        item.id === editingItem.id
          ? {...item, title: editTitle, subtitle: editSubtitle}
          : item,
      );
      setData(updatedData);
      setEditingItem(null);
      setTitle('');
      setSubtitle('');
      setIsModalVisible(false);
    }else {
        Alert.alert('Please Fill All Fields');
      }
  };

  const handleEditItem = item => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditSubtitle(item.subtitle);
    setIsModalVisible(true); // Open the modal for editing
  };

  const handleDelete = id => {
    if (delteItem) {
      setData(data.filter(item => item.id !== delteItem.id));
      setEditingItem(null);
      setIsdeleteModelVisible(false);
    }
  };

  const renderTaskItem = ({item}) => (
    <Card
      key={item.id}
      title={item.title}
      subtitle={item.subtitle}
      iconSource={item.iconSource}
      onPress={() => handleTaskPress(item.id)}
      isExpanded={expandedCards.includes(item.id)}
      onExpandToggle={() => handleExpandToggle(item.id)}
      deletePress={() => {
        showDeleteModal();
        setDelteItem(item);
      }}
      ediTBtnPress={() => {
        handleEditItem(item);
      }}
    />
  );

  const handleTaskPress = taskId => {
    // Handle task press action here
    console.log('Task pressed: ', taskId);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const showDeleteModal = () => {
    setIsdeleteModelVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };
  const DeletehideModal = () => {
    setIsdeleteModelVisible(false);
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <View style={{flex: 1, margin: responsiveWidth(5), alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: responsiveWidth(90),
            marginLeft: responsiveWidth(3),
          }}>
          <View style={{flex: 2}}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.lightYellow,
                borderRadius: responsiveWidth(1.3),
                marginBottom: responsiveHeight(0.7),
                width: '100%',
                padding: responsiveWidth(2),
                flex: 1,
                color: colors.lightBackground,
              }}
              placeholderTextColor={colors.lightBackground}
              placeholder="Title..."
              value={title}
              onChangeText={text => setTitle(text)}
            />
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.lightYellow,
                borderRadius: responsiveWidth(1.3),
                width: '100%',
                padding: responsiveWidth(2),
                flex: 1,
                color: colors.lightBackground,
              }}
              placeholderTextColor={colors.lightBackground}
              placeholder="About..."
              value={subtitle}
              onChangeText={text => setSubtitle(text)}
            />
          </View>
          <Pressable
            onPress={handleCreate}
            style={{flex: 0.8, alignItems: 'center'}}>
            <CustomBtn onPress={handleCreate} IconSource={Add} />
          </Pressable>
        </View>
        <FlatList
          data={data}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id.toString()}
          style={{marginTop: responsiveHeight(4), width: responsiveWidth(86)}}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmpty}
        />

        <Modal
          animationType="slide"
          transparent
          visible={isModalVisible}
          onRequestClose={hideModal}>
          <View style={editModalStyles.container}>
            <View style={editModalStyles.contentContainer}>
              <TextInput
                style={editModalStyles.input}
                placeholder="Mini Input..."
                placeholderTextColor={colors.lightBackground}
                value={editTitle}
                onChangeText={text => setEditTitle(text)}
              />
              <TextInput
                style={[editModalStyles.input, {flex: 1}]}
                textAlignVertical="top"
                placeholder="Mini Input..."
                placeholderTextColor={colors.lightBackground}
                value={editSubtitle}
                onChangeText={text => setEditSubtitle(text)}
              />
              <View style={editModalStyles.buttonContainer}>
                <RectangleBtn
                  text="Cancel"
                  onPress={hideModal}
                  containerStyle={{
                    marginTop: 20,
                    marginRight: responsiveWidth(3),
                  }}
                />
                <RectangleBtn
                  text="Save"
                  onPress={handleEdit}
                  containerStyle={{marginTop: 20}}
                />
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent
          visible={isdeleteModelVisible}
          onRequestClose={DeletehideModal}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: colors.mediumBackground,
                paddingHorizontal: responsiveWidth(4),
                padding: responsiveHeight(3),
                borderTopWidth: 5,
                borderTopColor: colors.lightYellow,
                width: '75%',
                flex: 1,
                maxHeight: responsiveHeight(25),
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: responsiveFontSize(2.4),
                  color: '#ffffff',
                  marginVertical: responsiveHeight(3),
                }}>
                Delete this task?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <RectangleBtn
                  text="Yes"
                  onPress={handleDelete}
                  containerStyle={{
                    marginTop: 20,
                    marginRight: responsiveWidth(3),
                  }}
                />
                <RectangleBtn
                  text="No"
                  onPress={DeletehideModal}
                  containerStyle={{marginTop: 20}}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Home;

const editModalStyles = {
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    backgroundColor: colors.mediumBackground,
    paddingHorizontal: responsiveWidth(4),
    padding: responsiveHeight(3),
    borderTopLeftRadius: responsiveWidth(2),
    borderTopRightRadius: responsiveWidth(2),
    width: '95%',
    flex: 1,
    maxHeight: responsiveHeight(65),
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.darkYellow,
    borderRadius: responsiveWidth(1.3),
    marginBottom: responsiveHeight(2),
    width: '100%',
    padding: responsiveWidth(2),
    color: colors.lightBackground,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
};
