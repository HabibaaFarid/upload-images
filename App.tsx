import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Button,
  StatusBar,
  Platform,
} from "react-native";

export default function App() {
  const [images, setImages] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getImages();
  }, []);

  const getImages = () => {
    fetch(`${process.env.BASE_URL}get-images`)
      .then((resp) => resp.json())
      .then((json) => setImages(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // axios
    //   .get(process.env.BASE_URL + "get-images", {})
    //   .then((resp) => setImages(resp.data))
    //   .catch((err) => console.log(err))
    //   .finally(() => setLoading(false));
  };

  const uploadImages = (images: any) => {
    console.log(images);
    const formData = new FormData();

    images.forEach(
      (img: { uri: any; type: string; name: string }, index: number) => {
        return formData.append("images", {
          uri: img.uri,
          type: "image", // Adjust the type according to the image format
          name: `image_${index}.jpg`,
        });
      }
    );
    formData.getAll("images").forEach((e) => {
      console.log(e);
    });

    axios
      .post(`${process.env.BASE_URL}upload-images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        getImages();
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 3],
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const uris = result?.assets || [];

      const selectedImageURIs = [...uris];
      uploadImages(selectedImageURIs);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.secondContainer}>
        {loading ? (
          <Text
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            Loading...
          </Text>
        ) : (
          <ScrollView>
            <Button title="Add Photo" onPress={pickImage}></Button>
            <View
              style={{
                justifyContent: "space-around",
                alignSelf: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {images.map(
                (img: { id: React.Key | null | undefined; imgUrl: any }) => {
                  return (
                    <Image
                      style={{ width: 150, height: 150, margin: 10 }}
                      key={img.id}
                      source={{ uri: SERVER_URL + img.imgUrl }}
                    />
                  );
                }
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  secondContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
