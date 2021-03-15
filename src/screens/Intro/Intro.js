import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ScreenContainer from '../../lib/components/ScreenContainer';
import MyText from '../../lib/components/MyText';
import Button from '../../lib/components/Button';

// Pass route.params

const Intro = ({navigation, route}) => {
  const currentMeditation = route.params.currentMeditation;

  return (
    <ScreenContainer scrollable>
      <MyText header>Welcome to Atomic Meditation!</MyText>
      <MyText>
        So, I'm guessing you've heard about the benefits of meditation and want
        to turn it into a daily habit?
      </MyText>
      <MyText>
        Developing a new habit can be difficult, but after I read Atomic Habits
        by James Clear, I decided to make a simple, no-nonsense meditation app
        applying some of the principles from the book:
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
      <MyText header>Pick a Time and Place</MyText>
      <MyText>
        2 mins is easy. Anybody can find at least 2 mins each day to sit alone
        and focus on their breath, or just let everything go.
      </MyText>
      <MyText>
        First, decide where you will meditate every day. When developing a
        habit, it's important to have a specific time and location. If just say
        you'll meditate every day without specifics, it's all too wishy-washy
        and you'll be less likely to do it.
      </MyText>
      <MyText>
        I personally meditate first thing in the morning in my bedroom.
      </MyText>
      <MyText>Be sure to set a reminder in Settings.</MyText>
      <MyText header>Lets Go</MyText>
      <MyText>
        Meditate for 2 mins to unlock the next day (a done button will appear
        after 2 mins), but you can meditate for as long as you like after 2 mins
        is up. Track your stats in the Stats screen. Use this app for every
        meditation for 60 days. After at least 2 mins per day for 60 days, I
        guarantee you will have a meditation habit for life!
      </MyText>

      <Button
        title="Set an Alarm"
        handlePress={() =>
          navigation.navigate('Meditation', {currentMeditation})
        }
      />
    </ScreenContainer>
  );
};

export default Intro;
