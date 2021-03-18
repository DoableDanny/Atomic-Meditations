import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import crashlytics from '@react-native-firebase/crashlytics';

import ScreenContainer from '../../lib/components/ScreenContainer';
import MyText from '../../lib/components/MyText';
import Button from '../../lib/components/Button';

// Pass route.params

const Intro = ({navigation, route}) => {
  const currentMeditation = route.params.currentMeditation;

  useEffect(() => {
    crashlytics().log('Intro Screen mounted');
  }, []);

  return (
    <ScreenContainer scrollable>
      <MyText header>Welcome to Atomic Meditation!</MyText>

      <Image
        style={styles.img}
        source={require('../../assets/images/profile.png')}
      />
      <MyText>Hi, I'm Danny, creator of this app!</MyText>
      <MyText>
        Developing a new habit can be difficult, but after I read Atomic Habits
        by James Clear, I decided to make a simple, no-nonsense meditation app
        applying some of the principles from the book to make meditation easy to
        stick to:
      </MyText>

      <MyText header>The 2 Minute Rule</MyText>
      <MyText>
        Developing a new habit is all about showing up, day after day, until the
        new behaviour becomes a natural and unquestionable part of your day -
        like brushing your teeth before bed.
      </MyText>
      <MyText>
        But if your goal is to do 1 hour of meditation every day when you've not
        meditated before, that's a steep hill to climb.
      </MyText>
      <MyText>
        Atomic (small) Meditation is all about doing a minimum of 2 mins per
        day, every day, until meditation becomes an ingrained, natural part of
        your day.
      </MyText>
      <MyText>
        2 mins is easy. Anybody can find at least 2 mins each day to sit alone
        and focus on their breath, or just let everything go.
      </MyText>

      <MyText header>Pick a Time and Place</MyText>
      <MyText>
        It's important to have a specific time and location. If just say you'll
        meditate every day without specifics, it's all too wishy-washy and
        you'll be less likely to do it.
      </MyText>
      <MyText>
        I personally meditate first thing in the morning in my bedroom.
      </MyText>
      <MyText>Be sure to set a reminder in Settings!</MyText>

      <MyText header>Lets Go</MyText>
      <MyText>
        Meditate for 2 mins to unlock the next day (a done button will appear
        after 2 mins), but you can meditate for as long as you like after 2 mins
        is up.
      </MyText>
      <MyText>
        Use this app for every meditation for 60 days. After at least 2 mins per
        day for 60 days, I'd find it hard to believe if you didn't have a more
        peaceful mind, and a seamless daily meditation habit for life!
      </MyText>

      <View style={styles.buttonWrapper}>
        <Button
          title="Lets Go"
          handlePress={() =>
            navigation.navigate('Meditation', {currentMeditation})
          }
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 230,
    height: 230,
    borderRadius: 115,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  buttonWrapper: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default Intro;
