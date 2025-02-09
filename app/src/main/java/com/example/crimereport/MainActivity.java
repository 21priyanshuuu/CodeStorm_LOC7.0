package com.example.crimereport;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.bumptech.glide.Glide;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.progressindicator.LinearProgressIndicator;
import com.google.firebase.FirebaseApp;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.OnProgressListener;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.util.HashMap;
import java.util.UUID;

public class MainActivity extends AppCompatActivity {
    StorageReference storageReference;
    DatabaseReference databaseReference;
    LinearProgressIndicator progressIndicator;
    Uri imageUri;
    MaterialButton uploadImage, selectImage, submitButton;
    ImageView imageView;
    EditText nameInput, numberInput, addressInput;

    private final ActivityResultLauncher<Intent> activityResultLauncher = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), new ActivityResultCallback<ActivityResult>() {
        @Override
        public void onActivityResult(ActivityResult result) {
            if (result.getResultCode() == RESULT_OK) {
                if (result.getData() != null) {
                    uploadImage.setEnabled(true);
                    imageUri = result.getData().getData();
                    Glide.with(getApplicationContext()).load(imageUri).into(imageView);
                }
            } else {
                Toast.makeText(MainActivity.this, "Please select an image", Toast.LENGTH_SHORT).show();
            }
        }
    });

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FirebaseApp.initializeApp(this);
        storageReference = FirebaseStorage.getInstance().getReference();
        databaseReference = FirebaseDatabase.getInstance().getReference("Users");

        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        progressIndicator = findViewById(R.id.progress);

        imageView = findViewById(R.id.imageView);
        selectImage = findViewById(R.id.selectImage);
        uploadImage = findViewById(R.id.uploadImage);
        submitButton = findViewById(R.id.submitButton);
        nameInput = findViewById(R.id.nameInput);
        numberInput = findViewById(R.id.numberInput);
        addressInput = findViewById(R.id.addressInput);

        selectImage.setOnClickListener(view -> {
            Intent intent = new Intent(Intent.ACTION_PICK);
            intent.setType("image/*");
            activityResultLauncher.launch(intent);
        });

        uploadImage.setOnClickListener(view -> uploadImageToFirebase());

        submitButton.setOnClickListener(view -> saveDataToDatabase());
    }

    private void uploadImageToFirebase() {
        if (imageUri == null) {
            Toast.makeText(this, "Please select an image first", Toast.LENGTH_SHORT).show();
            return;
        }

        StorageReference ref = storageReference.child("images/" + UUID.randomUUID().toString());
        ref.putFile(imageUri)
                .addOnSuccessListener(taskSnapshot -> ref.getDownloadUrl().addOnSuccessListener(uri -> {
                    Toast.makeText(MainActivity.this, "Image Uploaded!", Toast.LENGTH_SHORT).show();
                    saveDataToDatabase(uri.toString()); // Pass image URL to database
                }))
                .addOnFailureListener(e -> Toast.makeText(MainActivity.this, "Upload Failed: " + e.getMessage(), Toast.LENGTH_SHORT).show())
                .addOnProgressListener(taskSnapshot -> {
                    progressIndicator.setMax((int) taskSnapshot.getTotalByteCount());
                    progressIndicator.setProgress((int) taskSnapshot.getBytesTransferred());
                });
    }

    private void saveDataToDatabase() {
        saveDataToDatabase(null);
    }

    private void saveDataToDatabase(String imageUrl) {
        String name = nameInput.getText().toString().trim();
        String number = numberInput.getText().toString().trim();
        String address = addressInput.getText().toString().trim();

        if (name.isEmpty() || number.isEmpty() || address.isEmpty()) {
            Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
            return;
        }

        // Creating unique key for each user
        String userId = databaseReference.push().getKey();

        // Creating a HashMap to store data
        HashMap<String, Object> userData = new HashMap<>();
        userData.put("name", name);
        userData.put("number", number);
        userData.put("address", address);
        userData.put("image", imageUrl != null ? imageUrl : ""); // Store image URL if available

        assert userId != null;
        databaseReference.child(userId).setValue(userData)
                .addOnSuccessListener(aVoid -> {
                    Toast.makeText(MainActivity.this, "Data Stored Successfully!", Toast.LENGTH_SHORT).show();
                    clearForm();
                })
                .addOnFailureListener(e -> Toast.makeText(MainActivity.this, "Failed to store data: " + e.getMessage(), Toast.LENGTH_SHORT).show());
    }

    private void clearForm() {
        nameInput.setText("");
        numberInput.setText("");
        addressInput.setText("");
        imageView.setImageResource(R.drawable.placeholder);
        uploadImage.setEnabled(false);
        imageUri = null;
    }
}
