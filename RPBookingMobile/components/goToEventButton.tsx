import { forwardRef, useState } from "react";
import { Pressable, PressableProps, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";

{/* Pressable button with a grid pattern and radial glow */}
type Props = Omit<PressableProps, "children" | "style"> & {
  title: string;
  color?: string;
  pressedColor?: string;
};

{/* Grid button that checks its pressed state so it can change its appearance when pressed */}
export const GridButton = forwardRef<View, Props>(function GridButton(
  { title, color = "57,27,100", pressedColor = "184, 134, 11", ...rest },
  ref
) {

  {/* The button's measured size, so the SVG can fill it exactly */}
  const [box, setBox] = useState({ w: 0, h: 0 });

  return (
    <Pressable
      ref={ref}
      {...rest}
      style={styles.button}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setBox({ w: width, h: height });
      }}    
      >
      {({ pressed }) => {
        const rgb = pressed ? pressedColor : color;
        const radius = Math.hypot(box.w, box.h) / 2;        

        return (
          <>
            {/* Background: grid pattern under a radial glow. Draws the buttons background as an SVG file. */}
            {box.w > 0 && (
              <Svg
                key={pressed ? "pressed" : "normal"}
                width={box.w}
                height={box.h}
                style={StyleSheet.absoluteFill}
              >
                <Defs>
      <RadialGradient
        id="glow"
        gradientUnits="userSpaceOnUse"
        cx={box.w / 2}
        cy={box.h / 2}
        r={radius}
      >
        <Stop offset="0" stopColor={`rgb(${rgb})`} stopOpacity={0.15} />
        <Stop offset="0.95" stopColor={`rgb(${rgb})`} stopOpacity={0} />
      </RadialGradient>
    </Defs>
    <Rect width={box.w} height={box.h} fill="url(#glow)" />
  </Svg>
)}

            {/* Top and bottom border, strongest in the middle */}
            {["top", "bottom"].map((side) => (
              <LinearGradient
                key={side}
                colors={[`rgba(${rgb},0)`, `rgb(${rgb})`, `rgba(${rgb},0)`]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.border, { [side]: 0 }]}
              />
            ))}

            {/* Button text */}
            <Text style={[styles.text, { color: `rgb(${rgb})` }]}>{title}</Text>
          </>
        );
      }}
    </Pressable>
  );
});

{/* Styling for the grid button */}
const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,   
    paddingHorizontal: 48,
    overflow: "hidden",
  },
  border: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
  },
  text: {
    fontSize: 24,     
    fontWeight: "700",
    letterSpacing: 8, 
    textTransform: "uppercase",
  },
});