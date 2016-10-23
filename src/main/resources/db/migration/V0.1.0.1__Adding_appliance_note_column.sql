ALTER TABLE appliances
  DROP name,
  ADD note VARCHAR(500) AFTER ipv4_address;