import { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';

import Colors from '../utilities/Color';
import { Body012 } from '../utilities/Fonts';
import { screenWidth, screenHeight } from '../utilities/Layout';
import MemberDetailCell from '../components/MemberDetailCell';
import CustomAlert from '../components/Alert';

import img1 from '../assets/images/기본이미지.png';
import open from '../assets/images/open.png';

const menber = {
  id: 'ajtwoddl0425',
  name: '박혜림',
  phone_number: '010-2202-2878',
  email: 'ajtwoddl0425@naver.com',
  nickname: 'nalteng',
  obj: 6,
  obj_date: 6,
}

const MenberDetails = ({ navigation, route }) => {
  const goalsData = route.params ? route.params.data : menber.obj;
  const [alertOpen, setAlertOpen] = useState('');

  const logoutAction = () => {
    setAlertOpen('logOut');
  }

  const deleteAction = () => {
    setAlertOpen('deleteUser');
  }

  const handleCancle = () => {
    setAlertOpen('');
  }

  const handleNext = (value: boolean) => {
    if (value) console.log("로그아웃 되셨습니다.");
    else console.log("회원 탈퇴가 완료되셨습니다.");
    setAlertOpen('');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image source={img1} style={styles.img1} />
        </View>

        <MemberDetailCell title='시용자 목표 설정' infor={`${goalsData} Chapter / Week`} openPage='SetUserGoal' isOpenPage={true} />
        <MemberDetailCell title='이름' infor={menber.name} />
        <MemberDetailCell title='닉네임' infor={menber.nickname} />
        <MemberDetailCell title='아이디(이메일)' infor={`${menber.id} (${menber.email})`} />
        <MemberDetailCell title='휴대폰 번호' infor={menber.phone_number} />

        <TouchableOpacity style={styles.alertButton} onPress={logoutAction}>
          <View style={styles.buttonInner} >
            <Body012 text='로그아웃' color={Colors.GRAY03} />
            <Image source={open} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.alertButton} onPress={deleteAction}>
          <View style={styles.buttonInner} >
            <Body012 text='회원탈퇴' color={Colors.GRAY03} />
            <Image source={open} />
          </View>
        </TouchableOpacity>

      </View>
      {alertOpen === 'logOut' ? (
        <CustomAlert
          onCancle={handleCancle}
          onConfirm={() => handleNext(true)}
          content='로그아웃 하시겠습니까?'
          cancleText='취소'
          confirmText='확인' />
      ) : (
        alertOpen === 'deleteUser' ? (
          <CustomAlert
            onCancle={handleCancle}
            onConfirm={() => handleNext(false)}
            content='정말로 탈퇴 하시겠습니까?'
            cancleText='취소'
            confirmText='확인' />
        ) : null
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  inforContainer: {
    display: 'flex',
    paddingBottom: 30,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.03,
  },
  img1: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  alertButton: {
    marginHorizontal: 10,
    marginVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY09,
  },
  buttonInner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 20,
  }
});

export default MenberDetails;
