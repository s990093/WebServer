#!/bin/bash

# 檢查目標目錄是否存在，如果不存在則創建它
if [ ! -d "$HOME/mydisk" ]; then
    mkdir -p "$HOME/mydisk"
fi

# 確保卸載已存在的掛載點
if mount | grep -q "$HOME/mydisk"; then
    sudo umount "$HOME/mydisk"
fi

# 掛載 NTFS 文件系統的外接硬碟到 ~/mydisk
sudo mkdir -p /Volumes/NTFS
sudo /usr/local/bin/ntfs-3g /dev/disk12s1 /Volumes/NTFS -olocal -oallow_other

# 檢查掛載是否成功
if mount | grep -q "$HOME/mydisk"; then
    echo "掛載成功！"
else
    echo "掛載失敗。"
fi
