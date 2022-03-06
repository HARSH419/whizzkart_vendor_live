import {faDownload} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';

import {SafeAreaView, Text, View,AlertIOS, FlatList,ToastAndroid, StyleSheet ,PermissionsAndroid} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {monthlyReport} from '../actions';
import Loader from '../components/Loader';
import _ from 'lodash';
import {Parser} from 'json2csv';
import RNFS from 'react-native-fs';
const ReportCard = props => {
  return (
    <View style={style.CardRoot}>
      <Text allowFontScaling={false} style={style.textDownload}>
        {props.name}
        Report
      </Text>
      <FontAwesomeIcon
        style={style.icon}
        icon={faDownload}
        size={50}
        color="#AAAAAA"
      />
    </View>
  );
};

class AllReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoding: true,
    };
  }

  componentDidMount() {
    this.props.monthlyReport(() => {
      this.setState({isLoding: false});
    });
  }


  notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.LONG)
    } else {
      AlertIOS.alert(msg);
    }
  }


  download(e){

   
    const {data , report} = this.props;

    let obj ={};
    let arr = [];


  
// for(let i=0 ; i <=Object.values(report).length ; i++){

let dat = Object.entries(report);

dat.forEach(el => {
  el.forEach(ell =>{
    if(ell == e){
     obj = {...el}
    }

  })



})

const csvData = Object.values(obj);






// }

var path = RNFS.DownloadDirectoryPath + `/Month${Date.now()}.csv`;

try {
  const parser = new Parser();
  const csv = parser.parse(csvData[1]);
// write the file
RNFS.writeFile(path, csv , 'utf8')
.then((success) => {
 alert("Download completed");
 notifyMessage('Download completed')
})
.catch((err) => {
 console.log(err.message);
});

 
} catch (err) {
  console.error(err);
}




// const { config, fs } = RNFetchBlob
// let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
// let options = {
//   fileCache: true,
//   addAndroidDownloads : {
//     useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
//     notification : false,
//     path:  PictureDir + "/me_"+Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
//     description : 'Downloading image.'
//   }
// }
// config(options).fetch('GET', "http://www.example.com/example.pdf").then((res) => {
//   // do some magic here
// })

   
  }

  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: '#FFFFFF',
          height: '100%',
        }}>
        {this.state.isLoding ? (
          <Loader loadingText="Please wait..." />
        ) : (
          <FlatList
            data={this.props.data}
            renderItem={item => {
              return (
                <TouchableOpacity activeOpacity={1} onPress={()=> this.download(item.item)}>
                  <ReportCard name={item.item} />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  CardRoot: {
    height: 100,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textDownload: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  icon: {
    flex: 2,
  },
});

const mapStateToProps = state => {
  return {
    data: Object.keys( state.MonthlyReport),
    report : state.MonthlyReport
  };
};

export default connect(mapStateToProps, {monthlyReport})(AllReport);
