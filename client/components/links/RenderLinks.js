import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import PreviewCard from "./PreviewCard";

export default function RenderLinks({ links, handlePress }) {
  return (
    <View>
      <ScrollView horizontal showsHorinzontalScrollIndicator={false}>
        {links.map((link) => (
          <View
            key={link._id}
            style={{
              alignItems: "center",
              width: 400,
            }}
          >
            <PreviewCard
              {...link.urlPreview}
              handlePress={handlePress}
              link={link}
              showIcons="true"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
