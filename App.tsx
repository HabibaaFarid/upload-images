import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView,ScrollView, View, Image, Button} from 'react-native';

export default function App() {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true);
  const url = "https://jsonplaceholder.typicode.com/posts"
  useEffect(()=>{
    fetch(url)
    .then((resp) => resp.json())
    .then((json) => setImages(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
},[]);
function pressHandler (){
  console.log('clicked');
}
  
  return (
    <SafeAreaView style={styles.container}>
      {
        loading ?<Text style={{display: "flex",flex: 1, justifyContent:"center", alignSelf:"center"}}>Loading...</Text> :(
          <ScrollView >
      <Button title="Add Photo"  onPress={pressHandler} ></Button>
      <View style={{justifyContent:"space-around", alignSelf:"center", flexDirection:"row", flexWrap:"wrap", }}>
      {
        images.map(item =>{
          return (
            <>
         
            <Image
          style={{width: 150, height:150, margin:10 }}
          source={{ uri: 'https://cdn.shopify.com/s/files/1/0127/0982/files/SFS1703E-In-Store-Christmas-Coupon_grande.jpg?v=1509547438' }}
        />
           
            
            </>
            
        )
        })
      }
      </View>
    </ScrollView>
        )
      }

    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button:{
    alignSelf: "flex-end"
  }
});
