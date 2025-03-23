import React, { useRef, useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Txt from "./Text";
const GreyPlus = require("../assets/images/GreyPlus.png")
const { width, height } = Dimensions.get("window");
const slideWidth = width - 70;
const slideHeight = 160;

const Slider = () => {
  const [slides, setSlides] = useState([{}, {}]);
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addSlide = () => {
    setSlides([...slides, {}]);
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ x: slideWidth * slides.length, animated: true });
    }, 300);
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={slideWidth}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onScroll={handleScroll}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
      >
        {slides.map((_, index) => (
          <View key={index} style={[styles.slide, { width: slideWidth, height: slideHeight }]}> 
            <Txt style={styles.text}>Поверхня {index + 1}</Txt>
          </View>
        ))}
        <TouchableOpacity style={[styles.addSlide, { width: slideWidth, height: slideHeight }]} onPress={addSlide}>
          <Image style={styles.PlusIcon} source={GreyPlus}/>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.paginationContainer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
          ))}
          <View style={[styles.dot, currentIndex === slides.length && styles.activeDot]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 0,
    borderRadius: 10,
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    color: "#333",
  },
  addSlide: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "rgba(0, 0, 0, 0.05)",
    borderStyle: "dashed",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  PlusIcon: {
    width: 70,
    height: 70,
    color: "#000000",
  },
  paginationContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    flex: 1,
    height: 4,
    marginHorizontal: 2,
    backgroundColor: "#ccc",
  },
  activeDot: {
    backgroundColor: "#333",
  },
});

export default Slider;