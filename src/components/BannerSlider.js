import React from 'react';
import { View, Image } from 'react-native';
import { DEFAULT_IMAGE_URL } from '../utils/constant';

export default function BannerSlider({ data }) {
    return (
        <View>
            <Image
                source={data.image}
                style={{ height: 150, width: 300, borderRadius: 10 }}
            />
        </View>
    );
}