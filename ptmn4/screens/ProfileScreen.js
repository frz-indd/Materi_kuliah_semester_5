import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';

const SKILLS = [
  { id: 'react-native', name: 'React Native', level: 90, color: '#61dafb' },
  { id: 'flutter', name: 'Flutter', level: 75, color: '#02569b' },
  { id: 'javascript', name: 'JavaScript', level: 88, color: '#f7df1e' },
  { id: 'typescript', name: 'TypeScript', level: 80, color: '#3178c6' },
  { id: 'node', name: 'Node.js', level: 70, color: '#339933' },
  { id: 'firebase', name: 'Firebase', level: 82, color: '#ffca28' }
];

const TIMELINE = [
  {
    id: 'education',
    section: 'Pendidikan',
    role: 'Mahasiswa',
    company: 'Pendidikan tinggi',
    period: 'Saat ini',
    description: 'Sedang menempuh kuliah dan mengembangkan kemampuan di bidang teknologi.'
  },
  {
    id: 'business-plan',
    section: 'Rencana',
    role: 'Membangun usaha mandiri',
    company: 'Rencana setelah kuliah',
    period: 'Setelah kuliah',
    description:
      'Membangun usaha sebagai sampingan. Setelah usaha berjalan dan memiliki banyak pelanggan, berencana memulai ternak ayam broiler untuk bisnis telur dan daging.'
  }
];

const SOCIALS = ['GitHub', 'LinkedIn', 'Portofolio'];

function SkillCard({ item }) {
  return (
    <View style={styles.skillCard}>
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{item.name}</Text>
        <Text style={[styles.skillPercent, { color: item.color }]}>{item.level}%</Text>
      </View>
      <View style={styles.progressBackground}>
        <View
          style={[styles.progressFill, { width: `${item.level}%`, backgroundColor: item.color }]}
        />
      </View>
    </View>
  );
}

function TimelineCard({ item, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.role}, ${item.section}. Buka detail.`}
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.timelineCard, pressed && styles.pressed]}
    >
      <View style={styles.timelineDot} />
      <View style={styles.timelineContent}>
        <Text style={styles.timelineSection}>{item.section}</Text>
        <Text style={styles.timelineRole}>{item.role}</Text>
        <Text style={styles.timelineCompany}>{item.company}</Text>
        <Text style={styles.timelinePeriod}>{item.period}</Text>
        <Text style={styles.timelineHint}>Ketuk untuk detail</Text>
      </View>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const [openToWork, setOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [formNotice, setFormNotice] = useState('');
  const [formError, setFormError] = useState(false);
  const [actionNotice, setActionNotice] = useState('');
  const sendTimerRef = useRef(null);
  const downloadTimerRef = useRef(null);

  useEffect(() => () => {
    clearTimeout(sendTimerRef.current);
    clearTimeout(downloadTimerRef.current);
  }, []);

  function handleSend() {
    if (!senderName.trim() || !message.trim()) {
      setFormError(true);
      setFormNotice('Nama dan pesan tidak boleh kosong.');
      return;
    }

    setFormError(false);
    setFormNotice('');
    setSending(true);
    sendTimerRef.current = setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      setFormNotice('Simulasi selesai. Pesan belum dikirim ke server.');
    }, 1500);
  }

  function handleDownload() {
    setActionNotice('');
    setDownloading(true);
    downloadTimerRef.current = setTimeout(() => {
      setDownloading(false);
      setActionNotice('File CV belum tersedia.');
    }, 1000);
  }

  return (
    <>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <Image
            source={require('../foto/frz.jpg')}
            style={styles.avatar}
            resizeMode="cover"
            accessibilityLabel="Foto profil Mohamad Fariz Rachman Pratama"
          />
          <View style={[styles.statusBadge, !openToWork && styles.statusBadgeClosed]}>
            <Text style={styles.statusBadgeText}>
              {openToWork ? 'Terbuka untuk peluang' : 'Fokus kuliah'}
            </Text>
          </View>
          <Text style={styles.name}>Mohamad Fariz Rachman Pratama</Text>
          <Text style={styles.subtitle}>Mahasiswa · Cirebon</Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Terbuka untuk peluang</Text>
            <Switch
              accessibilityLabel="Status terbuka untuk peluang"
              value={openToWork}
              onValueChange={setOpenToWork}
              trackColor={{ false: '#374151', true: '#4ade80' }}
              thumbColor={openToWork ? '#ffffff' : '#d1d5db'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang Saya</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Tempat, tanggal lahir</Text>
            <Text style={styles.value}>Cirebon, 1 Maret 2006</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Cita-cita</Text>
            <Text style={styles.value}>Financial freedom</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Keahlian</Text>
          <View style={styles.listGap}>
            {SKILLS.map((item) => <SkillCard key={item.id} item={item} />)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Riwayat & Rencana</Text>
          <View style={styles.listGap}>
            {TIMELINE.map((item) => (
              <TimelineCard key={item.id} item={item} onPress={setSelectedItem} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sosial</Text>
          <View style={styles.socialRow}>
            {SOCIALS.map((social) => (
              <Pressable
                key={social}
                accessibilityRole="button"
                onPress={() => {
                  if (social === 'GitHub') {
                    Linking.openURL('https://github.com/frz-indd');
                    return;
                  }

                  setActionNotice(`Tautan ${social} belum ditambahkan.`);
                }}
                style={({ pressed }) => [styles.socialButton, pressed && styles.pressed]}
              >
                <Text style={styles.socialLabel}>{social}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            accessibilityRole="button"
            disabled={downloading}
            onPress={handleDownload}
            style={({ pressed }) => [styles.downloadButton, pressed && styles.pressed]}
          >
            {downloading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.downloadText}>Unduh CV</Text>
            )}
          </Pressable>
          {actionNotice ? (
            <Text accessibilityLiveRegion="polite" style={styles.actionNotice}>
              {actionNotice}
            </Text>
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hubungi Saya</Text>
          <Text style={styles.formNote}>Simulasi lokal, belum terhubung ke server.</Text>
          <TextInput
            accessibilityLabel="Nama pengirim"
            style={styles.textInput}
            placeholder="Nama Anda"
            placeholderTextColor="#888888"
            value={senderName}
            onChangeText={setSenderName}
            editable={!sending}
            returnKeyType="next"
          />
          <TextInput
            accessibilityLabel="Pesan"
            style={[styles.textInput, styles.textArea]}
            placeholder="Tulis pesan Anda di sini..."
            placeholderTextColor="#888888"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            editable={!sending}
          />
          <Pressable
            accessibilityRole="button"
            disabled={sending}
            onPress={handleSend}
            style={({ pressed }) => [styles.sendButton, pressed && styles.pressed]}
          >
            {sending ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color="#a78bfa" />
                <Text style={styles.loadingText}>Menyiapkan pesan...</Text>
              </View>
            ) : (
              <Text style={styles.sendButtonText}>Kirim Pesan</Text>
            )}
          </Pressable>
          {formNotice ? (
            <Text
              accessibilityLiveRegion="polite"
              style={[styles.formNotice, formError && styles.formError]}
            >
              {formNotice}
            </Text>
          ) : null}
        </View>
      </ScrollView>

      <Modal
        visible={selectedItem !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedItem(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalSection}>{selectedItem.section}</Text>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>{selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDescription}>{selectedItem.description}</Text>
              </>
            )}
            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectedItem(null)}
              style={({ pressed }) => [styles.modalCloseButton, pressed && styles.pressed]}
            >
              <Text style={styles.modalCloseText}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 16, paddingBottom: 32, gap: 14 },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#101a2b',
    borderColor: '#2d2d44',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 24
  },
  avatar: {
    borderColor: '#7c3aed',
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    marginBottom: 12,
    width: 110
  },
  statusBadge: {
    backgroundColor: '#052e16',
    borderColor: '#4ade80',
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 5
  },
  statusBadgeClosed: { backgroundColor: '#27272a', borderColor: '#71717a' },
  statusBadgeText: { color: '#4ade80', fontSize: 12, fontWeight: '700' },
  name: { color: '#f0f0f0', fontSize: 22, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: '#a78bfa', fontSize: 14, fontWeight: '700', marginTop: 6 },
  switchRow: {
    alignItems: 'center',
    borderTopColor: '#2d2d44',
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingTop: 12,
    width: '100%'
  },
  switchLabel: { color: '#9ca3af', flex: 1, fontSize: 13, fontWeight: '600' },
  section: {
    backgroundColor: '#101a2b',
    borderColor: '#2d2d44',
    borderRadius: 16,
    borderWidth: 1,
    padding: 18
  },
  sectionTitle: { color: '#f0f0f0', fontSize: 17, fontWeight: '700', marginBottom: 14 },
  detailRow: { borderTopColor: '#2d2d44', borderTopWidth: 1, paddingVertical: 12 },
  label: { color: '#9ca3af', fontSize: 12, fontWeight: '600', marginBottom: 5 },
  value: { color: '#f0f0f0', fontSize: 15 },
  listGap: { gap: 10 },
  skillCard: {
    backgroundColor: '#162133',
    borderColor: '#2d2d44',
    borderRadius: 10,
    borderWidth: 1,
    padding: 12
  },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  skillName: { color: '#f0f0f0', fontSize: 13, fontWeight: '700' },
  skillPercent: { fontSize: 13, fontWeight: '700' },
  progressBackground: { backgroundColor: '#0f172a', borderRadius: 4, height: 6, overflow: 'hidden' },
  progressFill: { borderRadius: 4, height: 6 },
  timelineCard: {
    backgroundColor: '#162133',
    borderColor: '#2d2d44',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 14
  },
  timelineDot: { backgroundColor: '#7c3aed', borderRadius: 5, height: 10, marginRight: 12, marginTop: 5, width: 10 },
  timelineContent: { flex: 1 },
  timelineSection: { color: '#a78bfa', fontSize: 11, fontWeight: '700', marginBottom: 5 },
  timelineRole: { color: '#f0f0f0', fontSize: 14, fontWeight: '700', marginBottom: 3 },
  timelineCompany: { color: '#a78bfa', fontSize: 13, marginBottom: 3 },
  timelinePeriod: { color: '#9ca3af', fontSize: 11, marginBottom: 6 },
  timelineHint: { color: '#f59e0b', fontSize: 11, fontStyle: 'italic' },
  socialRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  socialButton: { backgroundColor: '#162133', borderColor: '#2d2d44', borderRadius: 10, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10 },
  socialLabel: { color: '#a78bfa', fontSize: 12, fontWeight: '700' },
  downloadButton: { alignItems: 'center', backgroundColor: '#7c3aed', borderRadius: 10, justifyContent: 'center', marginTop: 14, minHeight: 44, paddingHorizontal: 16 },
  downloadText: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
  formNote: { color: '#9ca3af', fontSize: 12, marginBottom: 12 },
  actionNotice: { color: '#f59e0b', fontSize: 12, marginTop: 10, textAlign: 'center' },
  formNotice: { color: '#4ade80', fontSize: 13, marginTop: 12 },
  formError: { color: '#fca5a5' },
  textInput: {
    backgroundColor: '#0f172a',
    borderColor: '#2d2d44',
    borderRadius: 10,
    borderWidth: 1,
    color: '#f0f0f0',
    fontSize: 14,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  textArea: { height: 100 },
  sendButton: { alignItems: 'center', backgroundColor: '#7c3aed', borderRadius: 10, justifyContent: 'center', minHeight: 46, padding: 12 },
  sendButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '700' },
  loadingRow: { alignItems: 'center', flexDirection: 'row', gap: 10 },
  loadingText: { color: '#a78bfa', fontSize: 14, fontWeight: '600' },
  pressed: { opacity: 0.72 },
  modalOverlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)', flex: 1, justifyContent: 'flex-end' },
  modalBox: { backgroundColor: '#1e1b4b', borderColor: '#7c3aed', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderTopWidth: 3, padding: 22 },
  modalSection: { color: '#a78bfa', fontSize: 12, fontWeight: '700', marginBottom: 6 },
  modalTitle: { color: '#ffffff', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalCompany: { color: '#a78bfa', fontSize: 15, fontWeight: '700', marginBottom: 4 },
  modalPeriod: { color: '#9ca3af', fontSize: 13, marginBottom: 14 },
  modalDivider: { backgroundColor: '#2d2d44', height: 1, marginBottom: 14 },
  modalDescription: { color: '#f0f0f0', fontSize: 14, lineHeight: 22, marginBottom: 20 },
  modalCloseButton: { alignItems: 'center', backgroundColor: '#7c3aed', borderRadius: 10, paddingVertical: 12 },
  modalCloseText: { color: '#ffffff', fontWeight: '700' }
});