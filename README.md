# Volunteer Shapes (SHACL)

[volunteer-shapes](./volunteer-shapes.ttl) is a SHACL vocabulary for modelling volunteering-related data. It defines **NodeShapes** and **PropertyShapes** for **Activities**, **Roles**, **Organisations**, **Sessions**, **Locations**, **Skills**, **Rewards**, **Accessibility**, and **Time**, supporting consistent, validated RDF data about volunteering opportunities.

It is derived from [Volunteering SKOS vocabulary](https://api.volunteeringdata.io/schema.ttl), which describes volunteering activities, volunteer-involving organisations, and volunteering management systems.

> ⚠️ **Note:** IRIs in this vocabulary have been cleaned to remove the original `https___ns.volunteeringdata.io_` prefix for readability. All properties and nodes now use `volunteer-shape:` as the canonical namespace.

---

## **Namespaces**

| Prefix             | Namespace                                    |
| ------------------ | -------------------------------------------- |
| `volunteer-shape:` | `https://solidproject.org/shapes/volunteer#` |
| `sh:`              | `http://www.w3.org/ns/shacl#`                |
| `rdfs:`            | `http://www.w3.org/2000/01/rdf-schema#`      |
| `skos:`            | `http://www.w3.org/2004/02/skos/core#`       |
| `vs:`              | `http://www.w3.org/2006/VS/terms/`           |
| `dc:`              | `http://purl.org/dc/terms/`                  |
| `prov:`            | `http://www.w3.org/ns/prov#`                 |
| `xsd:`             | `http://www.w3.org/2001/XMLSchema#`          |

---

## **1. Node Shapes**

### **LocationShape**

* **Description:** Represents any location related to volunteering activities.
* **Target Class:** `volunteer-shape:Location`
* **Properties:**

  * `locationName`
  * `locationAddress`
  * `locationLatitude`
  * `locationLongitude`
  * `locationGeometry`
  * `locationSession`

### **OrganisationShape**

* **Description:** Represents organisations running volunteer activities.
* **Target Class:** `volunteer-shape:Organisation`
* **Properties:**

  * `organisationName`
  * `organisationDescription`
  * `organisationWebsite`
  * `organisationImage`
  * `organisationCause`
  * `organisationActivity`
  * `organisationCharityNumber`

### **RoleShape**

* **Description:** Represents any role related to a volunteering activity.
* **Target Class:** `volunteer-shape:Role`
* **Properties:**

  * `roleTitle`
  * `roleDescription`
  * `roleSkill`
  * `roleReward`
  * `roleAccessibility`
  * `roleRequirement`
  * `roleMinimumAge`
  * `roleMaximumAge`
  * `roleCommitment`
  * `roleAllowsRemoteParticipation`
  * `roleApplyLink`

### **ActivityShape**

* **Description:** Represents volunteer activities.
* **Target Class:** `volunteer-shape:Activity`
* **Properties:**

  * `activityTitle`
  * `activityDescription`
  * `activityImage`
  * `activityOrganisation`
  * `activityRole`
  * `activityRequiresEmergencyParticipation`
  * `activitySession`

### **TimeShape**

* **Description:** Time information related to volunteering activities modeled as OWL time entities.
* **Target Class:** `volunteer-shape:Time`
* **Properties:**

  * `timeSession`

### **SessionShape**

* **Description:** Describes a time and place for an activity involving volunteers.
* **Target Class:** `volunteer-shape:Session`
* **Properties:**

  * `sessionTime`
  * `sessionActivity`
  * `sessionLocation`

### **SkillShape, RewardShape, AccessibilityShape, RequirementShape, CauseShape**

* **Description:** NodeShapes for supporting roles, organisations, and activities.
* **Target Classes:** `Skill`, `Reward`, `Accessibility`, `Requirement`, `Cause`
* **Properties:** Links to Roles, Organisations, or Activities (e.g., `skillRole`, `rewardRole`, `accessibilityRole`, `roleRequirement`, `causeOrganisation`)

---

## **2. Property Shapes**

Property shapes define attributes and relationships between nodes. Examples include:

| Property Shape                           | Path                                     | Node Kind      | Class         | Datatype    | Description                        |
| ---------------------------------------- | ---------------------------------------- | -------------- | ------------- | ----------- | ---------------------------------- |
| `roleTitle`                              | `roleTitle`                              | Literal        | –             | –           | Role title                         |
| `roleDescription`                        | `roleDescription`                        | Literal        | –             | –           | Description of a role              |
| `roleSkill`                              | `roleSkill`                              | BlankNodeOrIRI | Skill         | –           | Skills for the role                |
| `roleReward`                             | `roleReward`                             | BlankNodeOrIRI | Reward        | –           | Reward linked to a role            |
| `roleAccessibility`                      | `roleAccessibility`                      | BlankNodeOrIRI | Accessibility | –           | Accessibility info                 |
| `roleRequirement`                        | `roleRequirement`                        | BlankNodeOrIRI | Requirement   | –           | Requirements for the role          |
| `roleMinimumAge`                         | `roleMinimumAge`                         | Literal        | –             | xsd:integer | Minimum age for participation      |
| `roleMaximumAge`                         | `roleMaximumAge`                         | Literal        | –             | xsd:integer | Maximum age for participation      |
| `roleAllowsRemoteParticipation`          | `roleAllowsRemoteParticipation`          | Literal        | –             | xsd:boolean | Remote participation allowed       |
| `roleCommitment`                         | `roleCommitment`                         | Literal        | –             | –           | Free text describing commitment    |
| `roleApplyLink`                          | `roleApplyLink`                          | Literal        | –             | –           | Link to apply for the role         |
| `activityTitle`                          | `activityTitle`                          | Literal        | –             | –           | Title of the activity              |
| `activityDescription`                    | `activityDescription`                    | Literal        | –             | –           | Description of the activity        |
| `activityImage`                          | `activityImage`                          | Literal        | –             | –           | Image related to the activity      |
| `activityOrganisation`                   | `activityOrganisation`                   | BlankNodeOrIRI | Organisation  | –           | Organisation running the activity  |
| `activityRole`                           | `activityRole`                           | BlankNodeOrIRI | Role          | –           | Roles in the activity              |
| `activityRequiresEmergencyParticipation` | `activityRequiresEmergencyParticipation` | Literal        | –             | xsd:boolean | Flags emergency participation      |
| `activitySession`                        | `activitySession`                        | BlankNodeOrIRI | Session       | –           | Sessions linked to an activity     |
| `organisationName`                       | `organisationName`                       | Literal        | –             | –           | Organisation name                  |
| `organisationDescription`                | `organisationDescription`                | Literal        | –             | –           | Description of the organisation    |
| `organisationWebsite`                    | `organisationWebsite`                    | Literal        | –             | –           | Organisation website URL           |
| `organisationImage`                      | `organisationImage`                      | Literal        | –             | –           | Organisation logo/image            |
| `organisationCause`                      | `organisationCause`                      | BlankNodeOrIRI | Cause         | –           | Charitable cause                   |
| `organisationActivity`                   | `organisationActivity`                   | BlankNodeOrIRI | Activity      | –           | Activities run by the organisation |
| `organisationCharityNumber`              | `organisationCharityNumber`              | Literal        | –             | –           | Registered charity number          |
| `sessionTime`                            | `sessionTime`                            | BlankNodeOrIRI | Time          | –           | Time info for a session            |
| `sessionActivity`                        | `sessionActivity`                        | BlankNodeOrIRI | Activity      | –           | Activities in the session          |
| `sessionLocation`                        | `sessionLocation`                        | BlankNodeOrIRI | Location      | –           | Location for the session           |
| `locationName`                           | `locationName`                           | Literal        | –             | –           | Name of the location               |
| `locationAddress`                        | `locationAddress`                        | Literal        | –             | –           | Address of the location            |
| `locationLatitude`                       | `locationLatitude`                       | Literal        | –             | xsd:decimal | Latitude                           |
| `locationLongitude`                      | `locationLongitude`                      | Literal        | –             | xsd:decimal | Longitude                          |
| `locationGeometry`                       | `locationGeometry`                       | Literal        | –             | –           | Spatial geometry                   |
| `locationSession`                        | `locationSession`                        | BlankNodeOrIRI | Session       | –           | Sessions at the location           |

> The vocabulary includes **dozens of additional property shapes** for accessibility, skills, rewards, and temporal information.

---

## **3. Relationships**

* **Roles** link to **Skills**, **Accessibility**, **Rewards**, **Requirements**, and **Activities**.
* **Activities** link to **Organisations**, **Roles**, and **Sessions**.
* **Sessions** link to **Locations**, **Activities**, and **Time**.
* **Locations** support spatial data (latitude, longitude, geometry) and addresses.
* **Organisations** can have multiple activities and charitable causes.
* **Time** entities model temporal information for sessions.

---

## **4. Usage**

Use this SHACL vocabulary to:

1. **Validate RDF data** about volunteering opportunities.
2. **Ensure consistency** of volunteer-related datasets.
3. **Model complex relationships** between activities, roles, sessions, locations, organisations, and time.
4. Use TypeScript classes for programmatic access — available under the [./objects](./objects/) directory.

**Example SPARQL queries**:

* Fetch all activities requiring emergency participation.
* List all roles allowing remote participation.
* Find all sessions at a given location.

---

## **5. Metadata**

* **Created:** 2026-03-23
* **Source:** `<https://api.volunteeringdata.io/schema.ttl>`
* **Status:** Testing
* **Provenance:** Derived from Volunteering Data API

