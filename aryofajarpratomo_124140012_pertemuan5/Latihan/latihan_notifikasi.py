"""Latihan mandiri Polymorphism: broadcast notifikasi multi-channel."""


class NotifikasiEmail:
    def kirim(self, pesan, penerima):
        return f"[EMAIL] ke {penerima}@itera.ac.id : {pesan}"


class NotifikasiSMS:
    def kirim(self, pesan, penerima):
        return f"[SMS]   ke {penerima} : {pesan[:40]}"


class NotifikasiWhatsApp:
    def kirim(self, pesan, penerima):
        return f"[WA]    ke {penerima} : *PENTING* {pesan}"


def broadcast_pengumuman(daftar_channel, pesan):
    """Mengirim pesan yang sama lewat semua channel (polymorphism)."""
    tujuan = {"NotifikasiEmail": "mahasiswa.if",
              "NotifikasiSMS": "0812-xxxx-0012",
              "NotifikasiWhatsApp": "Grup IF RA"}
    for channel in daftar_channel:
        print(channel.kirim(pesan, tujuan[type(channel).__name__]))


if __name__ == "__main__":
    broadcast_pengumuman(
        [NotifikasiEmail(), NotifikasiSMS(), NotifikasiWhatsApp()],
        "Kuliah PAW hari ini dipindah ke GK1-301 pukul 13.00",
    )
