import {StyleSheet, Dimensions} from 'react-native';
import {appcolor, headercolor, bannerColor, seperatorLineColor, 
    cellBorderColor, cellTitleColor, cellDescriptionTextColor, 
    bottomTabColor} from '../../constant/config';

const Style = StyleSheet.create ({
    backGroundStyle:{
        flex: 1,
        backgroundColor: 'white'
    },
    sliderImageStyle:{
        marginTop: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 100,
        resizeMode: 'cover'
    },
    textOnImage:{ 
        position: 'absolute', 
        top: 20, 
        color: 'red' 
    }

});
export default Style;