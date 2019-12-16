import React, { Component } from "react";
import {
    View, SafeAreaView,
    TouchableOpacity, Text
} from "react-native";
import Styles from './styles';
import WS_ImageList from '../../Webservices/WS_ImageList';
import { Spinner } from '../../components/Spinner';
import {appcolor
} from '../../constant/config';
import ImageSlider from 'react-native-image-slider';
import ImageS from 'react-native-image-progress';
import NetInfo from "@react-native-community/netinfo";
import { connect } from 'react-redux';


var SampleArray = [];
function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
class ImageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            tempWidth: 0,
            tempHeight: 0,
            cartList: [
                {
                    title: '199 Postpaid',
                    imagePath: require('../../img/ic_image_sim.png'),
                    ratingVal: 4,
                    description: 'This package is specially designed with great value that suite all...',
                    is_compare: true,
                    is_quickview: false,
                    is_wishlist: false,
                    is_addToCart: false
                }
            ],
        };
    }



    componentWillMount() {

        //console.log("*********componentWillMount********");
       this.setState({
          loading: true
        });

         NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected){
                this.ParseData();
                this.setState({
                    isNetwork: true
                })
            }else{
                this.setState({
                    isNetwork: false,
                    loading: false
                })

            }
          });
        
    }
    async ParseData() {


        //Redux action call
        // let currentImage = await imagesListAction();

      
      
        // if (currentImages != null) {
        //   console.log("Response..currentUser1SOVAN200..." + currentImage)
        //   //let message = currentImages.ErrorList;
        //   //alert(message)
        //   setTimeout(() => {
        //     this.navigateToNext();
        //   }, 3000);
        // }else{
        //   console.log("Response..currentUser1SOVAN...",currentImage)
          
        // }

        SampleArray = await WS_ImageList.imageList();
        if (SampleArray != null) {

            console.log("imageListArray null SOVAN: " + JSON.stringify(SampleArray))
            this.setState({
                loading: false,
                cartList: shuffleArray(SampleArray)
            });

            // {this.state.cartList.map((value, index) => {
            //     SampleArray.push( {title: value.title, urlStr: 'https://picsum.photos/200/300?image='+value.id} )
            //   })}
            //   this.setState({
            //     loading: false,
            //     cartList: SampleArray
            // });

            //SampleArray.push( this.state.Holder.toString() )

        } else {
            console.log("imageListArray null: ")
            this.setState({
                loading: false,
            });
        }

    }

   


    render() {
        //const { currentImages } = this.props;
        // this.setState({
        //     //loading: false,
        //     cartList: currentImages
        // });

        return (
            <View style={Styles.backGroundStyle}>
                <SafeAreaView style={{
                    flex: 0,
                    backgroundColor: appcolor
                }} />

                {/* <SafeAreaView style={Styles.backGroundStyle}>
                    <ImageSlider
                        //style={{ backgroundColor: 'white' }}
                        loopBothSides
                        autoPlayWithInterval={12000}
                        images={this.state.cartList}
                        customSlide={({ index, item }) => (
                            this.renderCartHistory(item, index)
                        )}
                    />
                </SafeAreaView> */}
                 {this.state.isNetwork ?<SafeAreaView style={Styles.backGroundStyle}>
                    <ImageSlider
                        //style={{ backgroundColor: 'white' }}
                        loopBothSides
                        // autoPlayWithInterval={12000}
                        images={this.state.cartList}
                        customSlide={({ index, item }) => (
                            // It's important to put style here because it's got offset inside
                            this.renderCartHistory(item, index)
                        )}
                    />
                    </SafeAreaView> :<SafeAreaView style={Styles.backGroundStyle}>
                    <Text style={{color: 'red', marginLeft: 20, marginTop: 30}}>Please check your network connection.</Text>
                    </SafeAreaView>}
                {this.state.loading && (<View
                    style={{ alignItems: "center" }}>
                    <Spinner />
                </View>)}
            </View>
        );
    }


    renderCartHistory(item, index) {
        return (
            <TouchableOpacity onPress={() => this._selectCellon(item, index)} style={{ alignItems: 'center' }}>

                <ImageS source={{ uri: 'https://picsum.photos/200/300?image=' + item.id }} style={Styles.sliderImageStyle}
                >
                </ImageS>
                <Text style={Styles.textOnImage}>{item.author}</Text>
            </TouchableOpacity>
        );
    }

    _selectCellon(item, index) {
        //alert(index)
    }

}


const mapStateToProps = ({ imagesListActions }) => ({
    // currentUser: logins.currentUser.currentUser
    currentImages: imagesListActions.currentImages
  });
  
  const mapDispatchToProps = dispatch => ({
    imagesListAction: () => dispatch(imagesListAction())
  });
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ImageList);


