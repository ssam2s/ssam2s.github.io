#!/bin/bash

# demo1.mp4 ~ demo8.mp4 파일 변환 후 교체 스크립트

for i in {1..8}
do
    input="demo${i}.mp4"
    temp="demo${i}_1.mp4"
    
    echo "Converting $input to $temp ..."
    
    # ffmpeg로 재인코딩 (비디오: H.264, 오디오: AAC, moov atom 앞당기기)
    ffmpeg -i "$input" -c:v libx264 -c:a aac -movflags faststart "$temp"
    
    # 변환 성공시
    if [ $? -eq 0 ]; then
        echo "Conversion successful for $input. Replacing file..."
        rm "$input"
        mv "$temp" "$input"
    else
        echo "Conversion failed for $input. Skipping replacement."
    fi
done

echo "All conversions completed."
