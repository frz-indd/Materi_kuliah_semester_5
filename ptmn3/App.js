import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';

const COLORS = {
  bg: '#0f172a',
  card: '#101a2b',
  cardBorder: '#2d2d44',
  accent: '#7c3aed',
  accentLight: '#a78bfa',
  accentGold: '#f59e0b',
  text: '#f0f0f0',
  textMuted: '#9ca3af',
  textDim: '#6b7280',
  success: '#4ade80',
  white: '#ffffff',
};

const PROFILE = {
  name: 'Fariz',
  title: 'Backend Developer',
  email: 'farisrachman213@email.com',
  phone: '+62 85189741389',
  location: 'Cirebon, Jawa Barat',
  bio: 'Pengembang aplikasi mobile dan web berpengalaman 4 tahun yang fokus pada React Native, Flutter,Laravel,Code Igniter.',
  avatar: 'https://media.suara.com/pictures/653x366/2022/11/22/84909-jokowi-pakai-jas-hujan.jpg',
};

const SKILLS = [
  { id: '1', name: 'React Native', level: 90, color: '#61DAFB' },
  { id: '2', name: 'Flutter', level: 75, color: '#02569B' },
  { id: '3', name: 'JavaScript', level: 88, color: '#F7DF1E' },
  { id: '4', name: 'TypeScript', level: 80, color: '#3178C6' },
  { id: '5', name: 'Node.js', level: 70, color: '#339933' },
  { id: '6', name: 'Firebase', level: 82, color: '#FFCA28' },
];

const SECTIONS = [
  {
    title: 'Pengalaman Kerja',
    data: [
      {
        id: 'e1',
        role: 'Senior Mobile Developer',
        company: 'PT. TechVision Indonesia',
        period: '2023 - Sekarang',
        desc: 'Mengembangkan fitur pembayaran digital menggunakan React Native & Flutter serta memastikan performa aplikasi stabil untuk ribuan pengguna.',
      },
      {
        id: 'e2',
        role: 'Mobile Developer',
        company: 'Startup Fintech - PayEasy',
        period: '2020 - 2022',
        desc: 'Mengembangkan fitur pembayaran digital dan integrasi API ke berbagai layanan finansial.',
      },
    ],
  },
  {
    title: 'Pendidikan',
    data: [
      {
        id: 'd1',
        degree: 'S1 Informatika',
        institution: 'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 - 2028',
        desc: 'IPK 3.65 / 4.00. Skripsi: Implementasi ML pada Aplikasi Mobile.',
      },
    ],
  },
];

const SOCIAL = [
  { id: 's1', label: 'GitHub', icon: '💻', url: 'https://github.com/frz-indd' },
  { id: 's2', label: 'GitHub', icon: '💻', url: 'https://github.com/frz-indd' },
];

function SkillCard({ item }) {
  return (
    <View style={styles.skillCard}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{item.name}</Text>
        <Text style={[styles.skillPercent, { color: item.color }]}>{item.level}%</Text>
      </View>

      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${item.level}%`,
              backgroundColor: item.color,
            },
          ]}
        />
      </View>
    </View>
  );
}

function TimelineCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.timelineCard}
      activeOpacity={0.8}
      onPress={() => onPress(item)}
    >
      <View style={styles.timelineDot} />
      <View style={styles.timelineContent}>
        <Text style={styles.timelineRole}>{item.role || item.degree}</Text>
        <Text style={styles.timelineCompany}>{item.company || item.institution}</Text>
        <Text style={styles.timelinePeriod}>{item.period}</Text>
        <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function App() {
  const [openToWork, setOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const openLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.warn('Gagal membuka link:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.windowBar}>
          <View style={[styles.windowDot, styles.redDot]} />
          <View style={[styles.windowDot, styles.yellowDot]} />
          <View style={[styles.windowDot, styles.greenDot]} />
        </View>

        <View style={styles.profileSection}>
          <Image source={{ uri: PROFILE.avatar }} style={styles.avatar} />
          <Text style={styles.profileName}>{PROFILE.name}</Text>
          <Text style={styles.profileTitle}>{PROFILE.title}</Text>
          <Text style={styles.profileBio}>{PROFILE.bio}</Text>

          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
            <Text style={styles.contactItem}>✉️ {PROFILE.email}</Text>
            <Text style={styles.contactItem}>📞 {PROFILE.phone}</Text>
          </View>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Open to Work</Text>
            <Pressable onPress={() => setOpenToWork((prev) => !prev)}>
              <View style={[styles.switchTrack, openToWork && styles.switchTrackActive]}>
                <View
                  style={[
                    styles.switchThumb,
                    openToWork && styles.switchThumbActive,
                  ]}
                />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <FlatList
            data={SKILLS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SkillCard item={item} />}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Pengalaman & Pendidikan</Text>
          <SectionList
            sections={SECTIONS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TimelineCard item={item} onPress={handleCardPress} />
            )}
            renderSectionHeader={({ section }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{section.title}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            SectionSeparatorComponent={() => <View style={{ height: 14 }} />}
          />
        </View>

        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Media Sosial</Text>
          <View style={styles.socialRow}>
            {SOCIAL.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => openLink(item.url)}
                style={styles.socialBtn}
              >
                <Text style={styles.socialIcon}>{item.icon}</Text>
                <Text style={styles.socialLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{selectedItem?.role || selectedItem?.degree}</Text>
            <Text style={styles.modalCompany}>{selectedItem?.company || selectedItem?.institution}</Text>
            <Text style={styles.modalPeriod}>{selectedItem?.period}</Text>
            <View style={styles.modalDivider} />
            <Text style={styles.modalDesc}>{selectedItem?.desc}</Text>

            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseBtnText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  contentContainer: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    paddingBottom: 42,
  },
  windowBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginLeft: 8,
  },
  windowDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 12,
  },
  redDot: { backgroundColor: '#ff5f57' },
  yellowDot: { backgroundColor: '#ffbd2e' },
  greenDot: { backgroundColor: '#28c840' },
  profileSection: {
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    marginBottom: 16,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  profileName: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 12,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  sectionBox: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  switchTrack: {
    width: 54,
    height: 30,
    borderRadius: 16,
    backgroundColor: '#374151',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  switchTrackActive: {
    backgroundColor: COLORS.success,
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#f8fafc',
    marginLeft: 0,
  },
  switchThumbActive: {
    marginLeft: 24,
  },
  skillCard: {
    backgroundColor: '#162133',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '700',
  },
  skillPercent: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontSize: 13,
    fontWeight: '700',
  },
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#162133',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginRight: 12,
    marginTop: 6,
  },
  timelineContent: {
    flex: 1,
  },
  timelineRole: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  timelineCompany: {
    color: COLORS.accentLight,
    fontSize: 13,
    marginBottom: 2,
  },
  timelinePeriod: {
    color: COLORS.textMuted,
    fontSize: 11,
    marginBottom: 4,
  },
  timelineHint: {
    color: COLORS.accentGold,
    fontSize: 11,
    fontStyle: 'italic',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#162133',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    flexDirection: 'row',
  },
  socialIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  socialLabel: {
    color: COLORS.accentLight,
    fontSize: 12,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBox: {
    width: '100%',
    backgroundColor: '#1e1b4b',
    borderRadius: 24,
    padding: 22,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  modalCompany: {
    color: COLORS.accentLight,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalPeriod: {
    color: COLORS.textMuted,
    fontSize: 13,
    marginBottom: 14,
  },
  modalDivider: {
    height: 1,
    backgroundColor: COLORS.cardBorder,
    marginBottom: 14,
  },
  modalDesc: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCloseBtnText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});

